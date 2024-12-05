import image1 from "@/assets/banner/1.jpg";
import image1Name from "@/assets/banner/01.webp";

import image2 from "@/assets/banner/2.jpg";
import image2Name from "@/assets/banner/02.webp";

import image3 from "@/assets/banner/3.jpg";
import image3Name from "@/assets/banner/03.webp";

import image4 from "@/assets/banner/4.webp";
import imageName from "@/assets/banner/04.webp";

import mobile1 from "@/assets/banner/mobile1.webp";
import desktop1 from "@/assets/banner/desktop1.webp";
import nameOne from "@/assets/banner/nameOne.avif";

import mobile2 from "@/assets/banner/mobile2.webp";
import desktop2 from "@/assets/banner/desktop2.webp";
import nameTwo from "@/assets/banner/nameTwo.avif";

const images = [
  { key: 1, mobileImage: image1, desktopImage: image1, imageName: image1Name },
  { key: 2, mobileImage: image2, desktopImage: image2, imageName: image2Name },
  { key: 3, mobileImage: image3, desktopImage: image3, imageName: image3Name },
  { key: 4, mobileImage: image4, desktopImage: image4, imageName },
  { key: 5, mobileImage: mobile1, desktopImage: desktop1, imageName: nameOne },
  { key: 6, mobileImage: mobile2, desktopImage: desktop2, imageName: nameTwo },
];

export default images;
