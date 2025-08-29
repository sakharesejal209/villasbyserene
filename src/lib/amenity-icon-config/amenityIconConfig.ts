import {
  AcUnitOutlined as ACIcon,
  LocalParkingOutlined as LocalParkingIcon,
  SportsEsportsOutlined as SportsEsportsIcon,
  GrassOutlined as GrassIcon,
  PoolOutlined as PoolIcon,
  TvOutlined as TvIcon,
  OpacityOutlined as OpacityIcon,
  WifiOutlined as WifiIcon,
  WineBar as BarCounter
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
};

export default amenityIconMap;
