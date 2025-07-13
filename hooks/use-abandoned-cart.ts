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
const ABANDON_TIMEOUT = 10 * 1000; // 30 minutes

const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export function useAbandonedCart() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sessionIdRef = useRef<string>(generateSessionId());

  const clearAbandonedCart = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
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
      const existing = sessionStorage.getItem(STORAGE_KEY);

      if (existing) {
        const existingData: AbandonedCartData = JSON.parse(existing);
        if (existingData.emailSent) {
          return;
        }
      }

      const data: AbandonedCartData = {
        userInfo,
        carInfo,
        timestamp: Date.now(),
        emailSent: false,
        sessionId: sessionIdRef.current,
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
    const handleVisibilityChange = () => {
      if (document.hidden) {
        resetTimer();
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

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
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
