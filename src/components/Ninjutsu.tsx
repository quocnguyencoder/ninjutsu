import katon from "../images/jutsu styles/katon.jpg";
import doton from "../images/jutsu styles/doton.jpg";
// import futon from "../images/jutsu styles/futon.png";
// import mokuton from "../images/jutsu styles/mokuton.jpg";
// import raiton from "../images/jutsu styles/raiton.jpg";
import suiton from "../images/jutsu styles/suiton.jpg";

export interface Ninjutsu {
  name: string;
  type: string;
  combo: string[];
  soundURL: string;
}

export const jutsuList: Ninjutsu[] = [
  {
    name: "Katon: Goukakyuu no Jutsu",
    type: `${katon}`,
    combo: ["snake", "tiger", "boar", "horse", "tiger"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Katon Goukakyuu no Jutsu! .mp3`,
  },
  {
    name: "Katon: Housenkano Jutsu",
    type: `${katon}`,
    combo: ["rat", "tiger", "dog", "ox", "hare", "tiger"],
    soundURL: "none",
  },
  {
    name: "Suiton: Ja no Kuchi",
    type: `${suiton}`,
    combo: ["monkey", "rat", "tiger", "dragon", "horse", "dragon"],
    soundURL: "none",
  },
  {
    name: "Doton: Doryuheki",
    type: `${doton}`,
    combo: ["tiger", "hare", "boar", "dog"],
    soundURL: "none",
  },
];
