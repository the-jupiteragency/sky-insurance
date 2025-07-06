"use client";

import { useEffect, useRef, useCallback } from "react";

interface AbandonedCartData {
  userInfo: {
    full_name: string;
    mobile_number: string;
    email?: string;
  };
  carInfo: {
    make: string;
    model: string;
    year: number;
    market_price: number;
    condition: string;
    fuel_type: string;
  };
  timestamp: number;
  emailSent: boolean;
  sessionId: string;
}

const STORAGE_KEY = "sky_insurance_abandoned_cart";
const SESSION_KEY = "sky_insurance_session_id";
// const ABANDON_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const ABANDON_TIMEOUT = 10 * 1000; // 30 minutes

const getSessionId = () => {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
};

export function useAbandonedCart() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const clearAbandonedCart = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: AbandonedCartData = JSON.parse(stored);
        if (!data.emailSent) {
          try {
            await fetch("/api/send-abandoned-cart-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            data.emailSent = true;
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          } catch (error) {
            console.error("Failed to send abandoned cart email:", error);
          }
        }
      }
    }, ABANDON_TIMEOUT);
  }, []);

  const saveAbandonedCart = useCallback(
    (
      userInfo: AbandonedCartData["userInfo"],
      carInfo: AbandonedCartData["carInfo"]
    ) => {
      const sessionId = getSessionId();
      const existing = sessionStorage.getItem(STORAGE_KEY);

      if (existing) {
        const existingData: AbandonedCartData = JSON.parse(existing);
        if (existingData.emailSent && existingData.sessionId === sessionId) {
          return;
        }
      }

      const data: AbandonedCartData = {
        userInfo,
        carInfo,
        timestamp: Date.now(),
        emailSent: false,
        sessionId,
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      resetTimer();
    },
    [resetTimer]
  );

  const getAbandonedCart = useCallback((): AbandonedCartData | null => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }, []);

  useEffect(() => {
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        resetTimer();
      } else {
        handleActivity();
      }
    };

    const handleBeforeUnload = () => {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: AbandonedCartData = JSON.parse(stored);
        if (!data.emailSent) {
          navigator.sendBeacon(
            "/api/send-abandoned-cart-email",
            JSON.stringify(data)
          );
        }
      }
    };

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resetTimer]);

  return {
    saveAbandonedCart,
    getAbandonedCart,
    clearAbandonedCart,
    resetTimer,
  };
}
