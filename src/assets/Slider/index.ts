// Import images
import image1 from "./1.jpg";
import image1Name from "./01.webp";

import image2 from "./2.webp";
import image2Name from "./02.webp";

import image3 from "./3.webp";
import image3Name from "./03.webp";

import image4 from "./4.jpg";
import image4Name from "./04.webp";

interface ImageObject {
  image: string;
  imageName: string;
}

const images: ImageObject[] = [
  { image: image1, imageName: image1Name },
  { image: image2, imageName: image2Name },
  { image: image3, imageName: image3Name },
  { image: image4, imageName: image4Name },
];

export { images };
