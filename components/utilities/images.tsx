import Image1 from "@public/images/placeholder/1.jpg";
import { randomInteger } from "@components/Highlights";

export const getRandomImage = () => {
  const random = 1;
  switch (random) {
    case 1: {
      return Image1.src;
    }
  }
};
