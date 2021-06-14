import { toReadableCase } from "../src/utils/normalizeString"

describe("test normalizeString.ts", () => {
  test("should work with slash", () => {
    expect(toReadableCase("foo-bar")).toEqual("Foo Bar")
    expect(toReadableCase("foo-bar-zoo")).toEqual("Foo Bar Zoo")
  })

  test("should work with space", () => {
    expect(toReadableCase("foo bar")).toEqual("Foo Bar")
    expect(toReadableCase("foo bar zoo")).toEqual("Foo Bar Zoo")
  })

  test("should work with slash and space", () => {
    expect(toReadableCase("foo-bar zoo")).toEqual("Foo Bar Zoo")
    expect(toReadableCase("foo bar-zoo")).toEqual("Foo Bar Zoo")
  })
})
