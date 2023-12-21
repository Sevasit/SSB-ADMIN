import localFont from "next/font/local";

const FontPrompt = localFont({
  src: [{ path: "../src/app/font/NotoSansThai-Medium.ttf" }],
  variable: "--font-prompt",
});

export default FontPrompt;
