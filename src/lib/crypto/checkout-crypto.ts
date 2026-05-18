// src/lib/checkout-crypto.ts
// Encrypts/decrypts booking state for URL params
// Install: npm install crypto-js
// npm install --save-dev @types/crypto-js

import CryptoJS from "crypto-js";

// Key is public — this is obfuscation not true security.
// Real sensitive data (userId, payment) never goes in the URL.
// This just prevents casual inspection of propertyId/unitId.
const SECRET = process.env.NEXT_PUBLIC_CHECKOUT_KEY ?? "vbs-checkout-2026";

export interface CheckoutState {
  propertyId: string;
  unitId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  infants: number;
  rooms: number;
  petCount: number;
}

export function encryptCheckout(state: CheckoutState): string {
  const json = JSON.stringify(state);
  const encrypted = CryptoJS.AES.encrypt(json, SECRET).toString();
  // Make URL-safe
  return encrypted.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function decryptCheckout(param: string): CheckoutState | null {
  try {
    // Restore base64 padding
    const restored = param.replace(/-/g, "+").replace(/_/g, "/");
    const padded = restored + "=".repeat((4 - (restored.length % 4)) % 4);
    const decrypted = CryptoJS.AES.decrypt(padded, SECRET);
    const json = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(json) as CheckoutState;
  } catch {
    return null;
  }
}
