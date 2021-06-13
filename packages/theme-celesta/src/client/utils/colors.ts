// Material design colors
const colors = [
  // Red
  "244, 67, 54",
  // Pink
  "233, 30, 99",
  // Purple
  "156, 39, 176",
  // Deep Purple
  "103, 58, 183",
  // Indigo
  "63, 81, 181",
  // Blue
  "33, 150, 243",
  // Light Blue
  "3, 169, 244",
  // Cyan
  "0, 188, 212",
  // Teal
  "0, 150, 136",
  // Green
  "76, 175, 80",
  // Light Green
  "139, 195, 74",
  // Lime
  "205, 220, 57",
  // Yellow
  "255, 235, 59",
  // Amber
  "255, 193, 7",
  // Orange
  "255, 152, 0",
  // Deep Orange
  "255, 87, 34",
  // Brown
  "121, 85, 72",
  // Grey
  "158, 158, 158",
  // Blue Grey
  "96, 125, 139",
  // White
  // "255, 255, 255",
  // Black
  // "0, 0, 0",
]

export function getColor(id: string) {
  let sum = 0
  for (const char of id) {
    sum += char.charCodeAt(0)
  }
  return colors[sum % colors.length]
}
