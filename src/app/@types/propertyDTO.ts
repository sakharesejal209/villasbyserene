import { PropertyImageDTO } from "./propertyImageDTO";
import { UnitDTO } from "./unitDTO";

export interface PropertyDTO {
  property_id: string;
  name: string;
  description: string;
  map_location: string;
  address: string;
  area: string;
  city: string;
  state: string;
  country: string;
  accommodationType: string;
  checkin_time: string;
  checkout_time: string;
  maxcapacity: number;
  bedroomcount: number;
  created_at: string;
  Unit: UnitDTO[];
  PropertyImage: PropertyImageDTO[];
  PropertyAmenity: {
    property_id: string;
    amenity_id: string;
    display_order: number;
  }[];
  NearByAttractions: {
    attraction_id: string;
    property_id: string;
    title: string;
    description: string;
    imageUrl: string;
    locationUrl: string;
  }[];
  FoodMenu: {
    menuId: string;
    property_id: string;
    description: string;
    isVeg: boolean;
    isNonVeg: boolean;
    menuUrl: string;
    breakfastTime: string;
    lunchTime: string;
    dinnerTime: string;
  };
}
