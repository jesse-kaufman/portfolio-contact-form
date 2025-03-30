/* eslint-disable max-lines-per-function */
/** @file NameInput component tests. */

import { describe, it, expect } from "vitest"
import { render, fireEvent } from "@testing-library/vue"
import NameInput, { validateName } from "@/components/inputs/NameInput.vue"

describe("NameInput.vue", () => {
  // Tests for component rendering.
  describe("rendering", () => {
    it("renders the input with the correct label", () => {
      const { getByLabelText } = render(NameInput)
      expect(getByLabelText("Your Name:")).toBeInTheDocument()
    })
  })

  // Test name input validation.
  describe("input validation", () => {
    it("validates proper name", () => {
      // Test if first name only was provided.
      expect(() => validateName("Jack")).not.toThrowError()
      // Test if full name was provided.
      expect(() => validateName("Jack Sawyer")).not.toThrowError()
      // Test if extra-long full name was provided.
      expect(() => validateName("Jack L. Sawyer III")).not.toThrowError()
    })

    it("throws an error for invalid name", () => {
      // Test too-short name.
      expect(() => validateName("a")).toThrowError()
      // Test too-long name.
      // eslint-disable-next-line no-magic-numbers
      expect(() => validateName("a".repeat(255))).toThrowError()
    })
  })

  // Tests for component interaction.
  describe("interaction", () => {
    // Test setting a valid value.
    it("binds the value correctly with v-model", async () => {
      const { getByLabelText } = render(NameInput)
      const input = getByLabelText("Your Name:")
      await fireEvent.update(input, "John Locke")
      expect(input.value).toBe("John Locke")
    })

    // Test setting an invalid value.
    it("throws error when setting invalid data with v-model", async () => {
      const { getByText, getByLabelText } = render(NameInput)
      const input = getByLabelText("Your Name:")
      await fireEvent.update(input, "J")
      expect(
        getByText("Name must be between 2 and 254 characters long.")
      ).toBeInTheDocument()
    })
  })
})
