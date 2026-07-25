import userService from "@/app/@services/user/user-service";
import { useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  full_name: string;
  email: string;
  profile_image: string | null;
  phone: string;
  is_admin: boolean; // ← from JWT payload, never from DB
}

interface UseAuthReturn {
  user: AuthUser | null;
  loading: boolean;
  login: (returnUrl?: string) => void;
  logout: () => Promise<void>;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService
      .getCurrentUser()
      .then((data: AuthUser) => setUser(data ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = (returnUrl?: string) => {
    const url = returnUrl
      ? `${API_BASE_URL}/auth/google?returnUrl=${encodeURIComponent(returnUrl)}`
      : `${API_BASE_URL}/auth/google`;
    globalThis.location.href = url;
  };

  const logout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return { user, loading, login, logout };
}
