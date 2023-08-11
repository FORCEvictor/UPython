import Blockly from "blockly";

let codemaoTheme = Blockly.Theme.defineTheme("codemao", {
  base: Blockly.Themes.Zelos,
  blockStyles: {
    controller: {
      colourPrimary: "#68cdff",
      colourTertiary: "#5db8e5",
    },
    calculation: {
      colourPrimary: "#feae8a",
      colourTertiary: "#e49c7c",
    },
    function: {
      colourPrimary: "#f88767",
      colourTertiary: "#df795c",
    },
    utility: {
      colourPrimary: "#00afc3",
      colourTertiary: "#009daf",
    },
    variable: {
      colourPrimary: "#ffbb55",
      colourTertiary: "#e5a84c",
    },
    list: {
      colourPrimary: "#f9cc37",
      colourTertiary: "#e0b731",
    },
    dictionary: {
      colourPrimary: "#a073ff",
      colourTertiary: "#9067e5",
    },
    color: {
      colourPrimary: "#2bc9a7",
      colourTertiary: "#19b693",
    },
  },
  categoryStyles: {
    controller: {
      colour: "#01adff",
    },
    calculation: {
      colour: "#f0aa8b",
    },
    function: {
      colour: "#f88767",
    },
    utility: {
      colour: "#5ab45b",
    },
    variable: {
      colour: "#ffbb55",
    },
    list: {
      colour: "#ff9c37",
    },
    dictionary: {
      colour: "#2bc9a7",
    },
    color: {
      colour: "#2bc9a7",
    },
  },
});

export default codemaoTheme;
