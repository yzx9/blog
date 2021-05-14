type KeyValuePair = { key: string; value: Object }

export function generateTempContent(keyValuePair: KeyValuePair): string
export function generateTempContent(keyValuePairs: KeyValuePair[]): string
export function generateTempContent(raw: KeyValuePair | KeyValuePair[]) {
  const keyValuePairs = Array.isArray(raw) ? raw : [raw]
  const content = keyValuePairs.map(({ key, value }) => {
    return `export const ${key} = ${JSON.stringify(value, null, 2)}`
  })
  return content.join("\n")
}
