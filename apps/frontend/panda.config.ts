import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  presets: [
    "@pandacss/preset-base",
    createPreset({
      accentColor: "purple",
      grayColor: "neutral",
      borderRadius: "sm",
    }),
  ],

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./src/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  jsxFramework: "react",

  globalCss: {
    body: {
      fontFamily: "Noto Sans JP",
    },
  },

  outdir: "src/lib/styled-system",
});
