import {
  PiChefHatLight as PrivateChef,
  PiSwimmingPoolLight as PoolIcon,
  PiBathtubLight as Bathtub,
  PiCricketLight as Turf,
  PiThermometerHotLight as GeyserIcon,
  PiHandSoap as ToiletriesIcon,
} from "react-icons/pi";
import {
  TbAirConditioning as ACIcon,
  TbArmchair as Sitoutarea,
  TbFridge as Fridge,
  TbBowlSpoon as CutleriesIcon,
} from "react-icons/tb";
import {
  MdOutlineLocalParking as LocalParkingIcon,
  MdOutlineCurtainsClosed as Curtains,
  MdHotTub as Jacuzzi,
  MdOutlinePower as PowerBackup,
  MdTv as TvIcon,
  MdOutlineDeck as Gazebo,
  MdWorkspacesOutline as Workspace,
  MdHotTub as Hottub,
  MdOutlineOutdoorGrill as BBQGrill,
} from "react-icons/md";
import { CgGames as IndoorGames, CgGym as Gym } from "react-icons/cg";
import {
  GiHighGrass as GrassIcon,
  GiMountainCave as MountainsIcon,
} from "react-icons/gi";
import {
  IoWaterOutline as WaterSupply,
  IoBonfireOutline as Bonfire,
} from "react-icons/io5";
import { AiOutlineWifi as WifiIcon } from "react-icons/ai";
import {
  BiDrink as BarCounter,
  BiSpeaker as SpeakerIcon,
} from "react-icons/bi";
import {
  RiChargingPile2Line as EVCharging,
  RiRestaurant2Line as Restaurant,
} from "react-icons/ri";
import {
  LiaUmbrellaBeachSolid as Raindance,
  LiaTemperatureLowSolid as TempControlPool,
  LiaHotTubSolid as SteamBath,
  LiaTableTennisSolid as TableTennisIcon,
} from "react-icons/lia";
import {
  LuCctv as CCTV,
  LuWashingMachine as WashingMachine,
} from "react-icons/lu";
import BarTender from "./custom-icons/BarTender";
import { BsProjector as ProjectorIcon } from "react-icons/bs";

const amenityIconMap: Record<string, React.ElementType> = {
  automatedCurtains: Curtains,
  barCounter: BarCounter,
  barTender: BarTender,
  bathtub: Bathtub,
  bbqgrill: BBQGrill,
  bonfire: Bonfire,
  cctv: CCTV,
  cliffview: MountainsIcon,
  cutleries: CutleriesIcon,
  evcharging: EVCharging,
  freeparking: LocalParkingIcon,
  fridge: Fridge,
  fullyAirConditioned: ACIcon,
  gazebo: Gazebo,
  geyser: GeyserIcon,
  gym: Gym,
  hillviews: MountainsIcon,
  hottub: Hottub,
  indoorgames: IndoorGames,
  jacuzzi: Jacuzzi,
  lawn: GrassIcon,
  openDinning: Gazebo,
  partiallyAirConditioned: ACIcon,
  powerBackup: PowerBackup,
  privateChef: PrivateChef,
  projectorSetup: ProjectorIcon,
  raindance: Raindance,
  restaurant: Restaurant,
  sitoutarea: Sitoutarea,
  speakerWithMic: SpeakerIcon,
  steamBath: SteamBath,
  swimmingpool: PoolIcon,
  tableTennis: TableTennisIcon,
  television: TvIcon,
  tempControllingPool: TempControlPool,
  toiletries: ToiletriesIcon,
  turf: Turf,
  washingMachine: WashingMachine,
  watersupply: WaterSupply,
  wifi: WifiIcon,
  workspace: Workspace,
};

export default amenityIconMap;
