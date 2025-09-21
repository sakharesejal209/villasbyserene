import { StaticImageData } from "next/image";
import Home from "../../../public/assets/themes/home.png";
import LuxuryStay from "../../../public/assets/themes/villa.png";
import PetFriendly from "../../../public/assets/themes/pet-friendly.png";
import CoupleFriendly from "../../../public/assets/themes/friendship.png";
import EcoRetreats from "../../../public/assets/themes/ecoRetreats.png";

const propertyThemeMap: Record<
  string,
  { image: StaticImageData; label: string }
> = {
  entireHome: { image: Home, label: "Entire Home" },
  petFriendly: { image: PetFriendly, label: "Pet Friendly" },
  luxuryStay: { image: LuxuryStay, label: "Luxury Escape" },
  coupleFriendly: { image: CoupleFriendly, label: "Couple Friendly" },
  ecoRetreat: { image: EcoRetreats, label: "Eco Retreat" },
};

export default propertyThemeMap;
