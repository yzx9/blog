// Material design colors
export const colors = {
  Red: "#f44336",
  Pink: "#e91e63",
  Purple: "#9c27b0",
  DeepPurple: "#673ab7",
  Indigo: "#3f51b5",
  Blue: "#2196f3",
  LightBlue: "#03a9f4",
  Cyan: "#00bcd4",
  Teal: "#009688",
  Green: "#4caf50",
  LightGreen: "#8bc34a",
  Lime: " #cddc39",
  Yellow: "#ffeb3b",
  Amber: "#ffc107",
  Orange: "#ff9800",
  DeepOrange: "#ff5722",
  Brown: "#795548",
  Grey: "#9e9e9e",
  BlueGrey: "#607d8b",
  White: "#ffffff",
  Black: "#000000",
}

type Colors = (keyof typeof colors)[]
const colorKeys = Object.keys(colors) as Colors
const colorValues = Object.values(colors)

function createSubColors(ignoredColors: Colors) {
  return colorValues.filter((_, i) => !ignoredColors.includes(colorKeys[i]))
}

export function createGetColorByRandom(ignoredColors: Colors) {
  const subColors = createSubColors(ignoredColors)

  return function () {
    const index = Math.floor(Math.random() * subColors.length)
    return subColors[index]
  }
}

export function createGetColorByHash(ignoredColors: Colors) {
  const array = createSubColors(ignoredColors)

  return function (id: string) {
    let sum = 0
    for (const char of id) {
      sum += char.charCodeAt(0)
    }
    return array[sum % array.length]
  }
}

const uncolorfulColors: Colors = ["White", "Black", "Grey"]
const visiualUnfriendlyColors: Colors = [...uncolorfulColors, "LightGreen"]

export const getColorfulColorByRandom = createGetColorByRandom(uncolorfulColors)
export const getVisiableColorByRandom = createGetColorByRandom(
  visiualUnfriendlyColors
)
export const getColorfulColorByHash = createGetColorByHash(uncolorfulColors)
export const getVisiableColorByHash = createGetColorByHash(
  visiualUnfriendlyColors
)
