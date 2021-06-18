import katon from "../images/jutsu styles/katon.jpg";
import doton from "../images/jutsu styles/doton.jpg";
import futon from "../images/jutsu styles/futon.png";
import mokuton from "../images/jutsu styles/mokuton.jpg";
import raiton from "../images/jutsu styles/raiton.jpg";
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
    name: "Katon: Housenka no Jutsu",
    type: `${katon}`,
    combo: ["rat", "tiger", "dog", "ox", "hare", "tiger", "monkey"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Katon Housenka no Jutsu! .mp3`,
  },

  {
    name: "Katon: Karyuu Endan",
    type: `${katon}`,
    combo: ["ram", "horse", "serpent", "dragon", "rat", "ox", "tiger"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Katon Karyuu Endan! .mp3`,
  },

  {
    name: "Katon: Kaen Senpuu",
    type: `${katon}`,
    combo: ["monkey", "bird", "dog", "ram"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Katon Kaen Senpuu! .mp3`,
  },

  {
    name: "Katon: Ryuuka no Jutsu",
    type: `${katon}`,
    combo: ["serpent", "dragon", "hare", "tiger"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Katon Ryuuka no Jutsu! .mp3`,
  },

  {
    name: "Katon: Benijigumo",
    type: `${katon}`,
    combo: ["tiger", "horse", "rat", "dog", "tiger"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Katon Benijigumo! .mp3`,
  },

  {
    name: "Katon: Kasumi Enbu",
    type: `${katon}`,
    combo: ["ram", "monkey", "tiger"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Katon Kasumi Enbu! .mp3`,
  },

  {
    name: "Katon: Gamayu Endan",
    type: `${katon}`,
    combo: ["serpent", "ram", "monkey", "boar", "horse", "tiger"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Katon Gamayu Endan! .mp3`,
  },

  {
    name: "Suiton: Kokuu no Jutsu",
    type: `${suiton}`,
    combo: ["ram", "serpent", "tiger"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Suiton Kokuu no Jutsu ! .mp3`,
  },

  {
    name: "Suiton: Ja no Kuchi",
    type: `${suiton}`,
    combo: ["rat", "tiger", "horse", "dargon"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Suiton Ja no Kuchi ! .mp3`,
  },

  {
    name: "Doton: Mud Wall",
    type: `${doton}`,
    combo: ["tiger", "hare", "boar", "dog"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Mud Wall.mp3`,
  },

  {
    name: "Doton: Mudslide Jutsu",
    type: `${doton}`,
    combo: ["dog", "sheep", "boar"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Mudslide Jutsu.mp3`,
  },

  {
    name: "Doton: Iron Prison",
    type: `${doton}`,
    combo: ["sheep", "dog", "hare", "rat"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Iron Prison.mp3`,
  },
  {
    name: "Raition: lightning ball",
    type: `${raiton}`,
    combo: ["bird", "snake", "monkey", "ram"],
    soundURL: `${process.env.PUBLIC_URL}/audio/lightning ball.mp3`,
  },

  {
    name: "Raition: feast of lightning",
    type: `${raiton}`,
    combo: ["hare", "boar", "sheep"],
    soundURL: `${process.env.PUBLIC_URL}/audio/feast of lightning.mp3`,
  },

  {
    name: "Raition: lightning rat tremor",
    type: `${raiton}`,
    combo: ["monkey", "ox", "boar", "tiger"],
    soundURL: `${process.env.PUBLIC_URL}/audio/lightning rat tremor.mp3`,
  },

  {
    name: "Futon: Art of the Gust Blade",
    type: `${futon}`,
    combo: ["tiger", "hare", "dog", "sheep", "dragon"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Art of the Gust Blade.mp3`,
  },

  {
    name: "Futon: Dust Storm Jutsu",
    type: `${futon}`,
    combo: ["horse", "monkey", "bird"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Dust Storm Jutsu.mp3`,
  },

  {
    name: "Futon: Immense Breakthrough",
    type: `${futon}`,
    combo: ["dog", "horse", "bird"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Immense Breakthrough.mp3`,
  },

  {
    name: "Futon: Vacuum Blast",
    type: `${futon}`,
    combo: ["rat", "snake", "horse", "dog"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Vacuum Blast.mp3`,
  },

  {
    name: "Mokuton: Four Pillar Prison Jutsu",
    type: `${mokuton}`,
    combo: ["ram", "ox", "boar", "snake"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Four Pillar Prison Jutsu.mp3`,
  },

  {
    name: "Mokuton: Four Pillar House Jutsu",
    type: `${mokuton}`,
    combo: ["snake", "rat", "ox", "ram", "snake"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Four Pillar House Jutsu.mp3`,
  },

  {
    name: "Mokuton: Transformation",
    type: `${mokuton}`,
    combo: ["bird", "dog", "snake"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Transformation.mp3`,
  },
];
