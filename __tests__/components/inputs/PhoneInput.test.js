/* eslint-disable max-lines-per-function */
/** @file PhoneInput component tests. */

import { describe, it, expect } from "vitest"
import { render, fireEvent } from "@testing-library/vue"
import { mount } from "@vue/test-utils"
import PhoneInput from "@/components/inputs/PhoneInput.vue"

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
      const instance = mount(PhoneInput).vm
      // Test multiple valid phone number formats.
      expect(() => instance.validatePhone("3213213214")).not.toThrow()
      expect(() => instance.validatePhone("(321) 321-3214")).not.toThrow()
      expect(() => instance.validatePhone("321-321-3214")).not.toThrow()
    })

    it("throws an error for invalid email", () => {
      const instance = mount(PhoneInput).vm
      // Test invalid phone number.
      expect(() => instance.validatePhone("481516")).toThrow()
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
