import { PiChefHatLight as PrivateChef, PiSwimmingPoolLight  as PoolIcon, PiBathtubLight  as Bathtub, PiCricketLight  as Turf } from 'react-icons/pi';
import { TbAirConditioning as ACIcon, TbArmchair as Sitoutarea, TbFridge  as Fridge } from "react-icons/tb";
import { MdOutlineLocalParking as LocalParkingIcon, MdOutlineCurtainsClosed as Curtains, MdHotTub as Jacuzzi, MdOutlinePower as PowerBackup, MdTv  as TvIcon, MdOutlineDeck  as Gazebo, MdWorkspacesOutline  as Workspace, MdHotTub  as Hottub, MdOutlineOutdoorGrill  as BBQGrill } from "react-icons/md";
import { CgGames as IndoorGames, CgGym  as Gym } from "react-icons/cg";
import { GiHighGrass as GrassIcon } from "react-icons/gi";
import { IoWaterOutline as WaterSupply, IoBonfireOutline  as Bonfire } from "react-icons/io5";
import { AiOutlineWifi as WifiIcon } from "react-icons/ai";
import { BiDrink as BarCounter } from "react-icons/bi";
import { RiChargingPile2Line as EVCharging, RiRestaurant2Line  as Restaurant } from "react-icons/ri";
import { LiaUmbrellaBeachSolid as Raindance, LiaTemperatureLowSolid  as TempControlPool, LiaHotTubSolid as SteamBath } from "react-icons/lia";
import { LuCctv as CCTV, LuWashingMachine as WashingMachine } from "react-icons/lu";
import BarTender from "./custom-icons/BarTender";

const amenityIconMap: Record<string, React.ElementType> = {
  airconditioned: ACIcon,
  freeparking: LocalParkingIcon,
  indoorgames: IndoorGames,
  lawn: GrassIcon,
  swimmingpool: PoolIcon,
  television: TvIcon,
  watersupply: WaterSupply,
  wifi: WifiIcon,
  barCounter: BarCounter,
  barTender: BarTender,
  evcharging: EVCharging,
  bonfire: Bonfire,
  restaurant: Restaurant,
  sitoutarea: Sitoutarea,
  gazebo: Gazebo,
  raindance: Raindance,
  bathtub: Bathtub,
  turf: Turf,
  gym: Gym,
  workspace: Workspace,
  tempControllingPool: TempControlPool,
  openDinning: Gazebo,
  hottub: Hottub,
  bbqgrill: BBQGrill,
  powerBackup: PowerBackup,
  cctv: CCTV,
  fridge: Fridge,
  washingMachine: WashingMachine,
  automatedCurtains: Curtains,
  jacuzzi: Jacuzzi,
  privateChef: PrivateChef,
  steamBath: SteamBath
};

export default amenityIconMap;
