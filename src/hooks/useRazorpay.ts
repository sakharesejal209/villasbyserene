import { useCallback, useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description?: string;
  image?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

export function useRazorpay() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if already loaded
    if (window.Razorpay) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT;
    script.async = true;
    script.onload = () => setLoaded(true);
    script.onerror = () => console.error("Failed to load Razorpay script");
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const openCheckout = useCallback(
    (options: RazorpayOptions) => {
      if (!loaded || !window.Razorpay) {
        console.error("Razorpay not loaded");
        return;
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    },
    [loaded],
  );

  return { loaded, openCheckout };
}
