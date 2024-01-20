import { HeroCard } from "../../../interfaces";
import { PostCard } from "../../../interfaces/postCard";

export const DUMMY_CAROUSEL_DATA: HeroCard[] = Array.from(
  { length: 3 },
  (_, index) => ({
    id: `item-${index + 1}`,
    title: `Title ${index + 1}`,
    description: `Description for item ${index + 1}.`,
    order: index + 1,
    active: index % 2 === 0,
    image: `image${index + 1}.jpg`,
    action: `Action ${index + 1}`,
  }),
);
export const DUMMY_POST_DATA: PostCard[] = Array.from(
  { length: 3 },
  (_, index) => ({
    id: `item-${index + 1}`,
    title: `Title ${index + 1}`,
    description: `Description for item ${index + 1}.`,
    order: index + 1,
    active: index % 2 === 0,
    action: `Action ${index + 1}`,
  }),
);
