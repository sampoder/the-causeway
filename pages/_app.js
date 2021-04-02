import { ThemeProvider, merge } from "theme-ui";
import theme from "theme-ui-preset-geist";
import "../public/slider.css";

export const defaultColors = {
  white: "#fff",
  black: "#000",
  gray: [
    "#fff", // 0 index
    "#fafafa",
    "#eaeaea",
    "#999",
    "#888",
    "#666",
    "#444",
    "#333",
    "#111",
  ],
  success: "#0070f3",
  successLight: "#3291ff",
  successDark: "#0366d6",
  error: "#e00",
  errorLight: "#ff1a1a",
  errorDark: "#c00",
  warning: "#f5a623",
  warningLight: "#f7b955",
  warningDark: "#f49b0b",
  cyan: "#50e3c2",
  cyanLighter: "#aaffec",
  cyanLight: "#79ffe1",
  cyanDark: "#29bc9b",
  violet: "#7928ca",
  violetLighter: "#e3d7fc",
  violetLight: "#8a63d2",
  violetDark: "#4c2889",
  purple: "#f81ce5",
  alert: "#ff0080",
  magenta: "#eb367f",
};

export const darkColors = {
  gray: [
    "#000",
    "#111",
    "#333",
    "#444",
    "#666",
    "#888",
    "#999",
    "#eaeaea",
    "#fafafa",
  ],
  success: "#0070f3",
  successLight: "#3291ff",
  successDark: "#0366d6",
  error: "#e00",
  errorLight: "#ff1a1a",
  errorDark: "#c00",
  warning: "#f5a623",
  warningLight: "#f7b955",
  warningDark: "#f49b0b",
};

const brandTheme = merge(theme, {
  colors: {
    text: defaultColors.white,
    background: defaultColors.black,
    secondary: darkColors.gray[5],
    selection: defaultColors.purple,
    ...darkColors,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={brandTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
