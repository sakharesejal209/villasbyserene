// import { PropertyListItemDTO, UnitGroupDTO } from "@/app/@types";
// import dayjs, { Dayjs } from "dayjs";

// export interface PriceResult {
//   price:    number;
//   label:    string;
//   type:     "seasonal" | "weekend" | "weekday" | "starting";
// }

// function getDayOfWeek(date: Dayjs): "weekday" | "weekend" {
//   const dow = date.day();
//   return dow === 0 || dow === 5 || dow === 6 ? "weekend" : "weekday";
// }

// export function getPriceForDate(
//   date: Dayjs,
//   group: UnitGroupDTO,
// ): PriceResult | null {
//   if (!group.pricing) return null;

//   if (group.seasonal_rate) {
//     const start = dayjs(group.seasonal_rate.start_date);
//     const end   = dayjs(group.seasonal_rate.end_date);
//     if (
//       (date.isAfter(start) || date.isSame(start, "day")) &&
//       (date.isBefore(end)  || date.isSame(end, "day"))
//     ) {
//       return {
//         price: group.seasonal_rate.price_per_night,
//         label: group.seasonal_rate.label,
//         type:  "seasonal",
//       };
//     }
//   }

//   const type = getDayOfWeek(date);
//   return {
//     price: type === "weekend"
//       ? group.pricing.weekend_price
//       : group.pricing.weekday_price,
//     label: type === "weekend" ? "Weekend rate" : "Weekday rate",
//     type,
//   };
// }

// export function getCardPrice(
//   property: PropertyListItemDTO,
//   checkIn?: string | null,
// ): PriceResult | null {
//   if (!property.starting_price) return null;

//   if (!checkIn) {
//     return {
//       price: property.starting_price,
//       label: "Select dates for exact price",
//       type:  "starting",
//     };
//   }

//   const date = dayjs(checkIn);
//   const dow  = date.day();
//   const isWeekend = dow === 0 || dow === 5 || dow === 6;

//   return {
//     price: property.starting_price,
//     label: isWeekend ? "Weekend · exact price on property page" : "Weekday rate",
//     type:  isWeekend ? "weekend" : "weekday",
//   };
// }



import { PropertyDetailDTO, PropertyListItemDTO, UnitGroupDTO } from "@/app/@types";
import dayjs, { Dayjs } from "dayjs";

export interface PriceResult {
  price: number;
  label: string;
  type:  "seasonal" | "weekend" | "weekday" | "starting";
}

function getDayOfWeek(date: Dayjs): "weekday" | "weekend" {
  const dow = date.day();
  return dow === 0 || dow === 5 || dow === 6 ? "weekend" : "weekday";
}

export function getPriceForDate(
  date: Dayjs,
  group: UnitGroupDTO,
): PriceResult | null {
  if (!group.pricing) return null;

  if (group.seasonal_rate) {
    const start = dayjs(group.seasonal_rate.start_date);
    const end   = dayjs(group.seasonal_rate.end_date);
    if (
      (date.isAfter(start) || date.isSame(start, "day")) &&
      (date.isBefore(end)  || date.isSame(end, "day"))
    ) {
      return {
        price: group.seasonal_rate.price_per_night,
        label: group.seasonal_rate.label,
        type:  "seasonal",
      };
    }
  }

  const type = getDayOfWeek(date);
  return {
    price: type === "weekend"
      ? group.pricing.weekend_price
      : group.pricing.weekday_price,
    label: type === "weekend" ? "Weekend rate" : "Weekday rate",
    type,
  };
}

export function getCardPrice(
  property: PropertyDetailDTO,
  checkIn?: string | null,
): PriceResult | null {
  // Resolve base price — prefer starting_price, fall back to first unit group pricing
  const firstGroup   = property.unit_groups?.[0];
  const firstPricing = firstGroup?.pricing;

  const baseWeekday = firstPricing?.weekday_price ?? null;
  const baseWeekend = firstPricing?.weekend_price ?? null;
  const basePrice   = property.starting_price || baseWeekday;
  
  if (!basePrice) return null;

  if (!checkIn) {
    return {
      price: basePrice,
      label: "Select dates for exact price",
      type:  "starting",
    };
  }

  const date      = dayjs(checkIn);
  const isWeekend = [0, 5, 6].includes(date.day());

  // Check seasonal rate on first unit group
  if (firstGroup?.seasonal_rate) {
    const start = dayjs(firstGroup.seasonal_rate.start_date);
    const end   = dayjs(firstGroup.seasonal_rate.end_date);
    if (
      (date.isAfter(start) || date.isSame(start, "day")) &&
      (date.isBefore(end)  || date.isSame(end, "day"))
    ) {
      return {
        price: firstGroup.seasonal_rate.price_per_night,
        label: firstGroup.seasonal_rate.label,
        type:  "seasonal",
      };
    }
  }

  // Weekend / weekday — use unit group prices if available, else starting_price
  if (isWeekend) {
    return {
      price: baseWeekend ?? basePrice,
      label: "Weekend rate",
      type:  "weekend",
    };
  }

  return {
    price: baseWeekday ?? basePrice,
    label: "Weekday rate",
    type:  "weekday",
  };
}