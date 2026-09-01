import { StaticImageData } from "next/image";
import Home from "../../../public/assets/themes/home.png";
import HomeDark from "../../../public/assets/themes/villa-dark.png";
import LuxuryStay from "../../../public/assets/themes/villa.png";
import LuxuryStayDark from "../../../public/assets/themes/villa-dark.png";
import PetFriendly from "../../../public/assets/themes/pet-friendly.png";
import PetFriendlyDark from "../../../public/assets/themes/pet-friendly-dark.png";
import CoupleFriendly from "../../../public/assets/themes/friendship.png";
import CoupleFriendlyDark from "../../../public/assets/themes/friendship-dark.png";
import EcoRetreats from "../../../public/assets/themes/ecoRetreats.png";
import EcoRetreatsDark from "../../../public/assets/themes/ecoRetreats-dark.png";

const propertyThemeMap: Record<
  string,
  {
    lightImg: StaticImageData;
    darkImg: StaticImageData;
    label: string;
    subLabel: string;
  }
> = {
  entireHome: {
    lightImg: Home,
    darkImg: HomeDark,
    label: "Entire Home",
    subLabel: "Yours alone",
  },
  petFriendly: {
    lightImg: PetFriendly,
    darkImg: PetFriendlyDark,
    label: "Pet Friendly",
    subLabel: "Bring the dog",
  },
  luxuryStay: {
    lightImg: LuxuryStay,
    darkImg: LuxuryStayDark,
    label: "Luxury Escape",
    subLabel: "The very best",
  },
  coupleFriendly: {
    lightImg: CoupleFriendly,
    darkImg: CoupleFriendlyDark,
    label: "Couple Friendly",
    subLabel: "Just the two",
  },
  ecoRetreat: {
    lightImg: EcoRetreats,
    darkImg: EcoRetreatsDark,
    label: "Eco Retreat",
    subLabel: "Off the grid",
  },
};

export default propertyThemeMap;
