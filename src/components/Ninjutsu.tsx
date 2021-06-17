export interface Ninjutsu {
  name: string;
  type: string;
  combo: string[];
  soundURL: string;
}

export const jutsuList: Ninjutsu[] = [
  {
    name: "Katon: Goukakyuu no Jutsu",
    type: "Katon",
    combo: ["snake", "tiger", "boar", "horse", "tiger"],
    soundURL: `${process.env.PUBLIC_URL}/audio/Katon Goukakyuu no Jutsu! .mp3`,
  },
  {
    name: "Katon: Housenkano Jutsu",
    type: "Katon",
    combo: ["rat", "tiger", "dog", "ox", "hare", "tiger"],
    soundURL: "none",
  },
  {
    name: "Suiton: Ja no Kuchi",
    type: "Suiton",
    combo: ["monkey", "rat", "tiger", "dragon", "horse", "dragon"],
    soundURL: "none",
  },
  {
    name: "Doton: Doryuheki",
    type: "Doton",
    combo: ["tiger", "hare", "boar", "dog"],
    soundURL: "none",
  },
];
