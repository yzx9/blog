// Material design colors
export const colors = {
  Red: "244, 67, 54",
  Pink: "233, 30, 99",
  Purple: "156, 39, 176",
  DeepPurple: "103, 58, 183",
  Indigo: "63, 81, 181",
  Blue: "33, 150, 243",
  LightBlue: "3, 169, 244",
  Cyan: "0, 188, 212",
  Teal: "0, 150, 136",
  Green: "76, 175, 80",
  LightGreen: "139, 195, 74",
  Lime: "205, 220, 57",
  Yellow: "255, 235, 59",
  Amber: "255, 193, 7",
  Orange: "255, 152, 0",
  DeepOrange: "255, 87, 34",
  Brown: "121, 85, 72",
  Grey: "158, 158, 158",
  BlueGrey: "96, 125, 139",
  White: "255, 255, 255",
  Black: "0, 0, 0",
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
