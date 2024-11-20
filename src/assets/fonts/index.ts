import localFont from "next/font/local";

const lato = localFont({
  src: [
    { path: "./Lato-Medium.woff2", weight: "500" },
    { path: "./Lato-Semibold.woff2", weight: "600" },
    { path: "./Lato-Bold.woff2", weight: "700" },
    { path: "./Lato-Heavy.woff2", weight: "900" },
  ],
  display: "swap",
});

export default lato;
