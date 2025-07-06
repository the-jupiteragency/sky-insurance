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
}

const STORAGE_KEY = "sky_insurance_abandoned_cart";
const ABANDON_TIMEOUT = 10 * 1000; // 30 seconds

export function useAbandonedCart() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const clearAbandonedCart = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
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
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: AbandonedCartData = JSON.parse(stored);
        if (!data.emailSent) {
          try {
            await fetch("/api/send-abandoned-cart-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });

            // Mark as sent
            data.emailSent = true;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
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
      const data: AbandonedCartData = {
        userInfo,
        carInfo,
        timestamp: Date.now(),
        emailSent: false,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      resetTimer();
    },
    [resetTimer]
  );

  const getAbandonedCart = useCallback((): AbandonedCartData | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }, []);

  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User left the page, start countdown
        resetTimer();
      } else {
        // User returned, reset activity
        handleActivity();
      }
    };

    // Activity events
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

    // Page visibility
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);

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
