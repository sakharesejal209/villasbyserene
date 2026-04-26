import AdminPropertyEntityDTO from "./AdminPropertyEntityDTO";
import AdminPropertyImageDTO from "./AdminPropertyImageDTO";
import AdminUnitDTO from "./AdminUnitDTO";
import FoodMenuDTO from "./FoodMenuDTO";
import MasterAmenityDTO from "./MasterAmenityDTO";
import MasterHouseRuleDTO from "./MasterHouseRuleDTO";
import MasterThemeDTO from "./MasterThemeDTO";
import NearByAttractionDTO from "./NearByAttractionDTO";
import SelectedAmenityDTO from "./SelectedAmenityDTO";
import SelectedRuleDTO from "./SelectedRuleDTO";
import SelectedThemeDTO from "./SelectedThemeDTO";

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
