import FoodMenuDTO from "./food-menu-dto";
import NearByAttractions from "./near-by-attractions-dto";
import { PropertyImageDTO } from "./property-image-dto";
import ThemesDTO from "./themes-dto";
import { UnitDTO } from "./unit-dto";



export default interface PropertyDTO {
  property_id: string;
  name: string;
  description: string;
  map_location: string | null;
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
  created_at: Date;
  mealsAvailable: boolean;
  Unit: UnitDTO[];
  PropertyImage: PropertyImageDTO[];
  PropertyAmenity: {
    amenity: {
      name: string;
    };
    property_id: string;
    amenity_id: string;
    display_order: number;
  }[];
  propertyRules: {
    display_order: number;
    houseRule: {
      description: string;
    };
    property_id: string;
    rule_id: string;
  }[];
  NearByAttractions: NearByAttractions[];
  FoodMenu: FoodMenuDTO[];
  themes: ThemesDTO[];
}