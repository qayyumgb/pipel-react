import { HeroCard } from "../../../interfaces";

export const DUMMY_CAROUSEL_DATA: HeroCard[] = Array.from(
  { length: 3 },
  (_, index) => ({
    id: `English-${index + 1}`,
    title: `Title ${index + 1}`,
    description: `Description for English ${index + 1}.`,
    order: index + 1,
    active: index % 2 === 0,
    image: `image${index + 1}.jpg`,
    action: `http://www.english.com/${index + 1}`,
  }),
);
export const DUMMY_CAROUSEL_DATA_HEBREW: HeroCard[] = Array.from(
  { length: 3 },
  (_, index) => ({
    id: `עִברִית-${index + 1}`,
    title: `כותרת ${index + 1}`,
    description: `תיאור לעברית ${index + 1}.`,
    order: index + 1,
    active: index % 2 === 0,
    image: `תמונה${index + 1}.jpg`,
    action: `http://www.hebrew.com/${index + 1}`,
  }),
);
