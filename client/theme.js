import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";




// color design tokens //
export const tokens = (mode) => ({
    ...(mode === 'dark'
    ?{
        grey: {
            900: "#a3a3a3",
            800: "#c2c2c2",
            700: "#a3a3a3",
            600: "#858585",
            500: "#666666",
            400: "#525252",
            300: "#3d3d3d",
            200: "#292929",
            100: "#141414"
        },
        darkRedAccent: {
            900: "#d2d2d2",
            800: "#a6a6a6",
            700: "#797979",
            600: "#4d4d4d",
            500: "#202020",
            400: "#1a1a1a",
            300: "#131313",
            200: "#0d0d0d",
            100: "#060606",
        },
        primary: {
            900: "#d0d1d5",
            800: "#a1a4aa",
            700: "#727680",
            600: "#434955",
            500: "#141b2b",
            400: "#222831",
            300: "#252525",
            200: "#080b11",
            100: "#040509"
        },
        
        greenAccent: {
            900: "#dbf5ee",
            800: "#b7ebde",
            700: "#94e2cd",
            600: "#70d8bd",
            500: "#B04759",
            400: "#3da58a",
            300: "#2e7c67",
            200: "#1e5245",
            100: "#0f2922"
        },
        
        redAccent: {
            900: "#f8dcdb",
            800: "#f1b9b7",
            700: "#e99592",
            600: "#e2726e",
            500: "#db4f4a",
            400: "#af3f3b",
            300: "#832f2c",
            200: "#58201e",
            100: "#2c100f"
        },
        
        blueAccent: {
            900: "#e1e2fe",
            800: "#c3c6fd",
            700: "#a4a9fc",
            600: "#868dfb",
            500: "#6870fa",
            400: "#535ac8",
            300: "#3e4396",
            200: "#2a2d64",
            100: "#151632"
        },
    }
    :{
        grey: {
            100: "#141414",
            200: "#292929",
            300: "#3d3d3d",
            400: "#525252",
            500: "#F6F5F5",
            600: "#858585",
            700: "#a3a3a3",
            800: "#292929",
            900: "#F0F0F0",
        },

        darkRedAccent: {
            100: "#d2d2d2",
            200: "#a6a6a6",
            300: "#797979",
            400: "#4d4d4d",
            500: "#202020",
            600: "#1a1a1a",
            700: "#131313",
            800: "#0d0d0d",
            900: "#060606",
        },
        primary: {
            100: "#040509",
            200: "#080b11",
            300: "#0c101a",
            400: "#B4B4B8",
            500: "#141b2b",
            600: "#434955",
            700: "#727680",
            800: "#a1a4aa",
            900: "#d0d1d5",
        },
        
        greenAccent: {
            100: "#0f2922",
            200: "#1e5245",
            300: "#2e7c67",
            400: "#3da58a",
            500: "#db4f4a",
            600: "#70d8bd",
            700: "#94e2cd",
            800: "#b7ebde",
            900: "#dbf5ee",
        },
        
        redAccent: {
            100: "#2c100f",
            200: "#58201e",
            300: "#832f2c",
            400: "#af3f3b",
            500: "#141b2b",
            600: "#e2726e",
            700: "#e99592",
            800: "#f1b9b7",
            900: "#f8dcdb",
        },
        
        blueAccent: {
            100: "#151632",
            200: "#2a2d64",
            300: "#3e4396",
            400: "#535ac8",
            500: "#6870fa",
            600: "#868dfb",
            700: "#a4a9fc",
            800: "#c3c6fd",
            900: "#e1e2fe",
        },

    }),

});


// mui theme settings //

export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
       palette: {
        mode: mode,
        ...(mode === 'dark'
         ? {
          primary: {
            main: colors.primary[400],
          },
          secondary:{
            main: colors.greenAccent[500],
          },
          neutral:{
            dark: colors.grey[600],
            main: colors.grey[300],
            light: colors.grey[200]
          },
          background: {
            default: colors.primary[500],
          },
         } 
         : {
            primary:{
                main: colors.primary[200],
              },
              secondary:{
                main: colors.greenAccent[500],
              },
              neutral:{
                dark: colors.grey[700],
                main: colors.grey[500],
                light: colors.grey[100]
              },
              background: {
                default:colors.grey[900]
              },
            }),
        },
        typography: {
            fontFamily: ["Source Sans 3", "sans-serif"].join(","),
            fontSize: 14,
            h1: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 18,
            },
            h6: {
                fontFamily: ["Source Sans 3", "sans-serif"].join(","),
                fontSize: 16,
            },
        },
      };
    };

// context for color mode //
export const ColorModeContext = createContext ({
    toggleColorMode: () => {},
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const colorMode = useMemo (
        () => ({
            toggleColorMode: () =>
            setMode((prev) => (prev === "dark" ? "light" : "dark")),
        }),
        []
    );

    const theme = useMemo ( () => createTheme(themeSettings(mode)), [mode])

    return [theme, colorMode];
}




