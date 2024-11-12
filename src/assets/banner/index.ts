import image1 from "./1.jpg";
import image1Name from "./01.webp";

import image2 from "./2.jpg";
import image2Name from "./02.webp";

import image3 from "./3.jpg";
import image3Name from "./03.webp";

import image4 from "./4.webp";
import imageName from "./04.webp";

import mobile1 from "./mobile1.webp";
import desktop1 from "./desktop1.webp";
import nameOne from "./nameOne.avif";

import mobile2 from "./mobile2.webp";
import desktop2 from "./desktop2.webp";
import nameTwo from "./nameTwo.avif";

const images = [
  { key: 1, mobileImage: image1, desktopImage: image1, imageName: image1Name },
  { key: 2, mobileImage: image2, desktopImage: image2, imageName: image2Name },
  { key: 3, mobileImage: image3, desktopImage: image3, imageName: image3Name },
  { key: 4, mobileImage: image4, desktopImage: image4, imageName },
  { key: 5, mobileImage: mobile1, desktopImage: desktop1, imageName: nameOne },
  { key: 6, mobileImage: mobile2, desktopImage: desktop2, imageName: nameTwo },
];

export default images;
