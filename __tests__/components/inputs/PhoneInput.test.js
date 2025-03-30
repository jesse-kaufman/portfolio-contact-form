/** @file PhoneInput component tests. */

import { describe, it, expect } from "vitest"
import { render, fireEvent } from "@testing-library/vue"
import PhoneInput, { validatePhone } from "@/components/inputs/PhoneInput.vue"

describe("PhoneInput.vue", () => {
  // Tests for component rendering.
  describe("rendering", () => {
    it("renders the input with the correct label", () => {
      const { getByLabelText } = render(PhoneInput)
      expect(getByLabelText("Your Phone:")).toBeInTheDocument()
    })
  })

  // Test phone input validation.
  describe("input validation", () => {
    it("validates proper phone", () => {
      // Test multiple valid phone number formats.
      expect(() => validatePhone("3213213214")).not.toThrowError()
      expect(() => validatePhone("(321) 321-3214")).not.toThrowError()
      expect(() => validatePhone("321-321-3214")).not.toThrowError()
    })

    it("throws an error for invalid email", () => {
      expect(() => validatePhone("481516")).toThrowError()
    })
  })

  // Tests for component interaction.
  describe("interaction", () => {
    // Test setting a valid value.
    it("binds the value correctly with v-model", async () => {
      const { getByLabelText } = render(PhoneInput)
      const input = getByLabelText("Your Phone:")
      await fireEvent.update(input, "3213213214")
      expect(input.value).toBe("3213213214")
    })

    // Test setting an invalid value.
    it("throws error when setting invalid data with v-model", async () => {
      const { getByText, getByLabelText } = render(PhoneInput)
      const input = getByLabelText("Your Phone:")
      await fireEvent.update(input, "J")
      expect(getByText("Invalid phone number.")).toBeInTheDocument()
    })
  })
})
