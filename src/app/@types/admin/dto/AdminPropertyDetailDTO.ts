import AdminPropertyEntityDTO from "./AdminPropertyEntityDTO";
import FoodMenuDTO from "../../property/FoodMenuDTO";
import MasterAmenityDTO from "../../property/MasterAmenityDTO";
import MasterHouseRuleDTO from "../../property/MasterHouseRuleDTO";
import MasterThemeDTO from "../../property/MasterThemeDTO";
import NearByAttractionDTO from "../../property/NearByAttractionDTO";
import SelectedAmenityDTO from "../../property/SelectedAmenityDTO";
import SelectedRuleDTO from "../../property/SelectedRuleDTO";
import SelectedThemeDTO from "../../property/SelectedThemeDTO";
import AdminUnitDTO from "./AdminUnitDTO";
import AdminPropertyImageDTO from "./AdminPropertyImageDTO";

export default interface AdminPropertyDetailDTO {
  property: AdminPropertyEntityDTO;
  units: AdminUnitDTO[];
  images: AdminPropertyImageDTO[];
  amenities: { all: MasterAmenityDTO[]; selected: SelectedAmenityDTO[] };
  houseRules: { all: MasterHouseRuleDTO[]; selected: SelectedRuleDTO[] };
  themes: { all: MasterThemeDTO[]; selected: SelectedThemeDTO[] };
  attractions: NearByAttractionDTO[];
  foodMenus: FoodMenuDTO[];
}
