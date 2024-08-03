/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      nunito: ["Nunito Sans", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },


    light: {
      background: '#FFFFFF',
    },
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "#ffffff00",
      // facebook theme
      vistuatBlue: {
        100: "#1763CF",
        200: "#1877f2"
      },
      faceBookTheme: {
        primary: '#4267B2',
        secondary: '#1877F2',
        text: '#050505',
        background: '#FFFFFF',
        border: '#E4E6EB',
        accent: '#E60023',
        error: '#D93025',
        success: '#00A400',
        warning: '#FFD200',
        info: '#1C6BF0',
      },
      buttonblue: {
        5: "#E7F3FF",
        100: "#0866FF",
        200: "#0068DI"

      },
      richgray: {
        5: "#8a8d91",
        25: "#F8F8F8",
        50: "#F0F2F5",
        100: "#B3B6BF",
        200: "#86888E",
        300: "#606770"
      },
      richwhite: {
        0: "#FFFFFF",
        5: "#ECF5FF",
        25: "#5979C9",
        50: "#F2F4FA",
        100: "#7A98A6",
        200: "#537988",
        300: "#2D5A6A",
        400: "#073B4C",
        500: "#063544",
        600: "#042E3B",
        700: "#032833",
        800: "#01212A",
        900: "#496ECB",
        1100: "#4764AD",
        1200: "#6888D9",
      },
      newRichblack: {
        5: "#3D3D3D",
        50: "#1C1E21"


      },
      richblack: {
        5: "#F1F2FF",
        25: "#DBDDEA",
        50: "#C5C7D4",
        100: "#AFB2BF",
        200: "#999DAA",
        300: "#838894",
        400: "#6E727F",
        500: "#585D69",
        600: "#424854",
        700: "#2C333F",
        800: "#161D29",
        900: "#000814",

      },
      richblue: {
        5: "#ECF5FF",
        25: "#C6D6E1",
        50: "#A0B7C3",
        100: "#7A98A6",
        200: "#537988",
        300: "#2D5A6A",
        400: "#073B4C",
        500: "#063544",
        600: "#042E3B",
        700: "#032833",
        800: "#01212A",
        900: "#001B22",
      },
      blue: {
        5: "#EAF5FF",
        25: "#B4DAEC",
        50: "#7EC0D9",
        100: "#47A5C5",
        200: "#118AB2",
        300: "#0F7A9D",
        400: "#0C6A87",
        500: "#0A5A72",
        600: "#074B5D",
        700: "#053B48",
        800: "#022B32",
        900: "#001B1D",
      },
      caribbeangreen: {
        5: "#C1FFFD",
        25: "#83F1DE",
        50: "#44E4BF",
        100: "#06D6A0",
        200: "#05BF8E",
        300: "#05A77B",
        400: "#049069",
        500: "#037957",
        600: "#026144",
        700: "#014A32",
        800: "#01321F",
        900: "#001B0D",
      },
      brown: {
        5: "#FFF4C4",
        25: "#FFE395",
        50: "#FFD166",
        100: "#E7BC5B",
        200: "#CFA64F",
        300: "#B89144",
        400: "#A07C39",
        500: "#88662D",
        600: "#705122",
        700: "#593C17",
        800: "#41260B",
        900: "#291100",
      },
      pink: {
        5: "#FFF1F1",
        25: "#FBC7D1",
        50: "#F79CB0",
        100: "#F37290",
        200: "#EF476F",
        300: "#D43D63",
        400: "#BA3356",
        500: "#9F294A",
        600: "#841E3E",
        700: "#691432",
        800: "#4F0A25",
        900: "#340019",
      },
      yellow: {
        5: "#FFF970",
        25: "#FFE83D",
        50: "#FFD60A",
        100: "#E7C009",
        200: "#CFAB08",
        300: "#B69507",
        400: "#9E8006",
        500: "#866A04",
        600: "#6E5503",
        700: "#553F02",
        800: "#3D2A01",
        900: "#251400",
      },
      "pure-greys": {
        5: "#F9F9F9",
        25: "#E2E2E2",
        50: "#CCCCCC",
        100: "#B5B5B5",
        200: "#9E9E9E",
        300: "#888888",
        400: "#717171",
        500: "#5B5B5B",
        600: "#444444",
        700: "#2D2D2D",
        800: "#171717",
        900: "#141414",
      },
    },
    extend: {
      maxWidth: {
        maxContent: "1460px",
        maxContentTab: "750px"
      },
    },

  },
  plugins: [],
};


