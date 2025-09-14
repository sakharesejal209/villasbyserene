import {
  AcUnitOutlined as ACIcon,
  LocalParkingOutlined as LocalParkingIcon,
  SportsEsportsOutlined as SportsEsportsIcon,
  GrassOutlined as GrassIcon,
  PoolOutlined as PoolIcon,
  TvOutlined as TvIcon,
  OpacityOutlined as OpacityIcon,
  WifiOutlined as WifiIcon,
  WineBar as BarCounter,
  PlumbingOutlined as EVCharging,
  LocalFireDepartmentOutlined as Bonfire,
  ChairOutlined as Sitoutarea,
  DeckOutlined as Gazebo,
  RestaurantMenuOutlined as Restaurant,
  ShowerOutlined as Raindance
} from "@mui/icons-material";
import BarTender from "./custom-icons/BarTender";

const amenityIconMap: Record<string, React.ElementType> = {
  airconditioned: ACIcon,
  freeparking: LocalParkingIcon,
  indoorgames: SportsEsportsIcon,
  lawn: GrassIcon,
  swimmingpool: PoolIcon,
  television: TvIcon,
  watersupply: OpacityIcon,
  wifi: WifiIcon,
  barCounter: BarCounter,
  barTender: BarTender,
  evcharging: EVCharging,
  bonfire: Bonfire,
  restaurant: Restaurant,
  sitoutarea: Sitoutarea,
  gazebo: Gazebo,
  raindance: Raindance
};

export default amenityIconMap;
