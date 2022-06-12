import { SxStyleProp } from "rebass"

export const theme = {
  breakpoints: ["425px", "768px", "1170px", "1280px", "1440px"],
  colors: {
    green: "#26AB64",
    white: "#F3F8F2",
    error1: "#FF6F59",
    error: "#D7263D",
    // error: "#9e2a2b",
  },
  heading: {
    fontSize: [22, 40, 50],
    fontWeight: "bold",
  },
}

export enum Theme {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
}

interface IThemeColors {
  bg: string
  text: string
  button: {
    bg: string
    text: string
  }
}

export const themeColors: { [key in Theme]: IThemeColors } = {
  [Theme.PRIMARY]: {
    bg: theme.colors.green,
    text: theme.colors.white,
    button: {
      bg: theme.colors.white,
      text: theme.colors.green,
    },
  },
  [Theme.SECONDARY]: {
    bg: theme.colors.white,
    text: theme.colors.green,
    button: {
      bg: theme.colors.green,
      text: theme.colors.white,
    },
  },
}
