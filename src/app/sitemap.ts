import { MetadataRoute } from "next";

const BASE_URL = "https://www.villasbyserene.in";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://vbs-be.onrender.com";

function toPropertySlug(name: string, id: string): string {
  return `${name
    .toLowerCase()
    .replaceAll(/[^a-z0-9\s]/g, "")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/-+/g, "-")
    .trim()}-${id.slice(0, 8)}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static routes ─────────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/stays/all`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/stays/karjat`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/stays/alibaug`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/stays/lonavala`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/stays/udaipur`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/stays/navi-mumbai`,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/list`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/our-story`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cancellation`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // ── Dynamic property pages ────────────────────────────────────
  let propertyRoutes: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${API_BASE_URL}/properties`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (res.ok) {
      const properties = await res.json();
      propertyRoutes = properties.map(
        (p: { name: string; property_id: string; created_at: string }) => ({
          url: `${BASE_URL}/property/${toPropertySlug(p.name, p.property_id)}`,
          lastModified: new Date(p.created_at),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        }),
      );
    }
  } catch {
    // Fail silently — static routes still get submitted even if
    // the backend is down during build
  }

  return [...staticRoutes, ...propertyRoutes];
}
