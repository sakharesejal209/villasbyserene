import FoodMenuDTO from "./FoodMenuDTO";
import HouseRuleDTO from "./HouseRuleDTO";
import NearByAttractionDTO from "./NearByAttractionDTO";
import PropertyImageDTO from "./PropertyImageDTO";
import PropertyListItemDTO from "./PropertyListItemDTO";
import UnitGroupDTO from "./UnitGroupDTO";

export default interface PropertyDetailDTO extends PropertyListItemDTO {
  map_location: string | null;
  all_images: PropertyImageDTO[];
  unit_groups: UnitGroupDTO[];
  house_rules: HouseRuleDTO[];
  nearby_attractions: NearByAttractionDTO[];
  food_menus: FoodMenuDTO[];
}
