// import httpService from "../http-service";
// import {
//   PropertyFiltersDTO,
//   PropertyListItemDTO,
//   QuoteRequestDTO,
// } from "@/app/@types/property/property.type";

// class PropertiesService {
//   getProperties = (filters: PropertyFiltersDTO = {}) => {
//     return httpService<PropertyListItemDTO[]>().get("/properties", {
//       params: filters,
//     });
//   };

//   getProperty = (propertyId: string, checkIn?: string, checkOut?: string) => {
//     return httpService().get(`/properties/${propertyId}`, {
//       params: { checkIn, checkOut },
//     });
//   };

//   getBookingQuote = (data: QuoteRequestDTO) => {
//     return httpService().post("/pricing/quote", data);
//   };
// }

// const propertiesService = new PropertiesService();
// export default propertiesService;

// src/services/properties.service.ts

import {
  BookingQuoteDTO,
  PropertyDetailDTO,
  PropertyFiltersDTO,
  PropertyListItemDTO,
  QuoteRequestDTO,
} from "@/app/@types";
import httpService from "../http-service";

function buildQueryString(filters: PropertyFiltersDTO): string {
  const params = new URLSearchParams();
  if (filters.city) params.set("city", filters.city);
  if (filters.area) params.set("area", filters.area);
  if (filters.state) params.set("state", filters.state);
  if (filters.theme) params.set("theme", filters.theme);
  if (filters.accommodationType)
    params.set("accommodationType", filters.accommodationType);
  if (filters.guests) params.set("guests", String(filters.guests));
  if (filters.checkIn) params.set("checkIn", filters.checkIn);
  if (filters.checkOut) params.set("checkOut", filters.checkOut);
  if (filters.bedrooms) params.set("bedrooms", String(filters.bedrooms));
  if (filters.priceMin) params.set("priceMin", String(filters.priceMin));
  if (filters.priceMax) params.set("priceMax", String(filters.priceMax));
  if (filters.amenities?.length)
    params.set("amenities", filters.amenities.join(","));
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

class PropertiesService {
  getProperties = (filters: PropertyFiltersDTO = {}) => {
    const qs = buildQueryString(filters);
    return httpService<PropertyListItemDTO[]>().get(`/properties${qs}`);
  };

  async getProperty(propertyId: string, checkIn?: string, checkOut?: string) {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return httpService<PropertyDetailDTO>().get(
      `/properties/${propertyId}${qs}`,
    );
  }

  getPropertyBySlug = (slug: string, checkIn?: string, checkOut?: string) => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    const qs = params.toString() ? `?${params.toString()}` : "";
    return httpService<PropertyDetailDTO>().get(
      `/properties/slug/${slug}${qs}`,
    );
  };

  getBookingQuote = (data: QuoteRequestDTO) => {
    return httpService<BookingQuoteDTO>().post("/pricing/quote", data);
  };
}

const propertiesService = new PropertiesService();
export default propertiesService;
