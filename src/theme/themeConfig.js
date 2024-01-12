import * as colors from "@mui/material/colors";


export const themeConfig = {
  // Light theme
  light: {
    palette: {
      type: "light",
      primary: {
        // Use hue from colors or hex
        // main: colors.indigo["900"],
        main: "#000",
        // Uncomment to specify light/dark
        // shades instead of automatically
        // calculating from above value.
        //light: "#4791db",
        //dark: "#115293",
      },
      secondary: {
        main: colors.pink["500"],
      },
      background: {
        // Background for <body>
        // and <Section color="default">
        default: "#f5f5f5",
        // Background for elevated
        // components (<Card>, etc)
        paper: "#fefefe",
      },
    },
  },

  // Dark theme
  dark: {
    palette: {
      type: "dark",
      primary: {
        // Same as in light but we could
        // adjust color hue if needed
        // main: colors.indigo["500"],
        main: "#333",
      },
      secondary: {
        main: colors.grey["100"],
      },
      background: {
        default: colors.grey["900"],
        paper: colors.grey["800"],
      },
      text: {
        primary: colors.grey["100"],
        secondary: colors.grey["500"],
        disabled: colors.grey["300"],
      },
      MuiIconButton: {
        primary: colors.grey["100"],
        secondary: colors.grey["500"],
        disabled: colors.grey["300"],
      }
    },
  },

  // Values for both themes
  common: {
    typography: {
      fontSize: 14,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      // Uncomment to make button lowercase
      // button: { textTransform: "none" },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1200,
        xl: 1920,
      },
    },
    // Override component styles
    overrides: {
      // Global styles
      MuiCssBaseline: {
        "@global": {
          "#root": {
            // Flex column that is height
            // of viewport so that footer
            // can push self to bottom by
            // with auto margin-top
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            // Prevent child elements from
            // shrinking when content
            // is taller than the screen
            // (quirk of flex parent)
            "& > *": {
              flexShrink: 0,
            },
          },
        },
      },
    },
  },
};
