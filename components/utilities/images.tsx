import Image1 from "@public/images/placeholder/1.jpg";
import Image2 from "@public/images/placeholder/2.jpg";
import Image3 from "@public/images/placeholder/3.jpg";
import Image4 from "@public/images/placeholder/4.jpg";
import Image5 from "@public/images/placeholder/5.jpg";
import Image6 from "@public/images/placeholder/6.jpg";
import Image7 from "@public/images/placeholder/7.jpg";
import Image8 from "@public/images/placeholder/8.jpg";
import Image9 from "@public/images/placeholder/9.jpg";
import Image10 from "@public/images/placeholder/10.jpg";
import Image11 from "@public/images/placeholder/11.jpg";
import Image12 from "@public/images/placeholder/12.jpg";
import Image13 from "@public/images/placeholder/13.jpg";
import Image14 from "@public/images/placeholder/14.jpg";
import Image15 from "@public/images/placeholder/15.jpg";
import Image16 from "@public/images/placeholder/16.jpg";
import Image17 from "@public/images/placeholder/17.jpg";
import Image18 from "@public/images/placeholder/18.jpg";
import { randomInteger } from "@components/Highlights";

export const getRandomImage = () => {
  const random = parseInt(randomInteger(1, 18));
  switch (random) {
    case 1: {
      return Image1.src;
    }
    case 2: {
      return Image2.src;
    }
    case 3: {
      return Image3.src;
    }
    case 4: {
      return Image4.src;
    }
    case 5: {
      return Image5.src;
    }
    case 6: {
      return Image6.src;
    }
    case 7: {
      return Image7.src;
    }
    case 8: {
      return Image8.src;
    }
    case 9: {
      return Image9.src;
    }
    case 10: {
      return Image10.src;
    }
    case 11: {
      return Image11.src;
    }
    case 12: {
      return Image12.src;
    }
    case 13: {
      return Image13.src;
    }
    case 14: {
      return Image14.src;
    }
    case 15: {
      return Image15.src;
    }
    case 16: {
      return Image16.src;
    }
    case 17: {
      return Image17.src;
    }
    case 18: {
      return Image18.src;
    }
  }
};
