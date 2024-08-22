import { createTheme, PaletteOptions } from "@mui/material/styles";
import themeConfig from "./theme.config";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor, contrastText: "#FBF5F5" } });
const colorKeys = Object.keys(themeConfig.colors);

const paletteConfigArr = colorKeys.map((colorKey: string) => {
  return {
    [colorKey]: createColor(themeConfig.colors[colorKey] as string),
  };
});

const paletteConfig = Object.assign({}, ...paletteConfigArr);

interface CustomPaletteOptions extends PaletteOptions {
  primary: {
    main: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    contrastText: string;
  };
  secondaryDark: {
    main: string;
    contrastText: string;
  };
  white: {
    main: string;
    contrastText: string;
  };
  gray: {
    main: string;
    contrastText: string;
  };
  grayLight: {
    main: string;
    contrastText: string;
  };
  black: {
    main: string;
    contrastText: string;
  };
  green: {
    main: string;
    contrastText: string;
  };
  yellow: {
    main: string;
    contrastText: string;
  };
  purple: {
    main: string;
    contrastText: string;
  };
  red: {
    main: string;
    contrastText: string;
  };
  blue: {
    main: string;
    contrastText: string;
  };
  error: never;
  warning: never;
  info: never;
  success: never;
  grey: never;
  text: never;
}

const theme = createTheme({
  palette: paletteConfig as CustomPaletteOptions,
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.size === "default" && {
            width: "11rem",
            height: "3.5rem",
          }),
          ...(ownerState.size === "small" && {
            width: "5.5rem",
            height: "3.5rem",
          }),
          ...(ownerState.size === "thin" && {
            width: "5.5rem",
            height: "2.5rem",
          }),
          ...(ownerState.size === "large" && {
            width: "16rem",
            height: "3.5rem",
          }),
        }),
      },
    },
  },
  typography: {
    fontFamily: themeConfig.fontFamily.body.join(","),
    fontError: {
      fontSize: themeConfig.fontSize.fontError,
    },
    fontHeader: {
      fontSize: themeConfig.fontSize.fontHeader,
    },
    fontTitle: {
      fontSize: themeConfig.fontSize.fontTitle,
    },
    fontLarge: {
      fontSize: themeConfig.fontSize.fontLarge,
    },
    fontRegular: {
      fontSize: themeConfig.fontSize.fontRegular,
    },
  },
});
export default theme;

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
    secondaryDark: PaletteColor;
    white: PaletteColor;
    gray: PaletteColor;
    grayLight: PaletteColor;
    black: PaletteColor;
    green: PaletteColor;
    yellow: PaletteColor;
    purple: PaletteColor;
    red: PaletteColor;
    blue: PaletteColor;
  }
  interface PaletteOptions {
    secondaryDark: PaletteColorOptions;
    white: PaletteColorOptions;
    gray: PaletteColorOptions;
    grayLight: PaletteColorOptions;
    black: PaletteColorOptions;
    green: PaletteColorOptions;
    yellow: PaletteColorOptions;
    purple: PaletteColorOptions;
    red: PaletteColorOptions;
    blue: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primary: true;
    secondary: true;
    secondaryDark: true;
    white: true;
    gray: true;
    grayLight: true;
    black: true;
    green: true;
    yellow: true;
    purple: true;
    red: true;
    blue: true;
    error: never;
    warning: never;
    info: never;
    success: never;
    grey: never;
    text: never;
  }
  interface ButtonPropsSizeOverrides {
    large: true;
    medium: true;
    small: true;
    default: true;
    thin: true;
  }

  interface ButtonPropsVariantOverrides {
    contained: true;
    outlined: true;
    text: true;
    loading: true;
  }
}

declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    primary: true;
    secondary: true;
    secondaryDark: true;
    white: true;
    gray: true;
    grayLight: true;
    black: true;
    green: true;
    yellow: true;
    purple: true;
    red: true;
    blue: true;
  }
}

declare module "@mui/material/styles/createTypography" {
  interface TypographyOptions {
    fontFamily: string;
    fontError: {
      fontSize: string;
    };
    fontHeader: {
      fontSize: string;
    };
    fontTitle: {
      fontSize: string;
    };
    fontLarge: {
      fontSize: string;
    };
    fontRegular: {
      fontSize: string;
    };
  }
  interface Typography {
    fontFamily: string;
    fontError: {
      fontSize: string;
    };
    fontHeader: {
      fontSize: string;
    };
    fontTitle: {
      fontSize: string;
    };
    fontLarge: {
      fontSize: string;
    };
    fontRegular: {
      fontSize: string;
    };
  }
}
