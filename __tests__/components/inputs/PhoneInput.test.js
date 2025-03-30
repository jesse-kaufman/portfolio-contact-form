/* eslint-disable max-lines-per-function */
/** @file PhoneInput component tests. */

import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/vue"
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

    it("shows and removes error when invalid data is corrected", async () => {
      // Set phone to invalid value and check for error.
      const phoneInput = screen.getByLabelText("Your Phone:")
      await fireEvent.update(phoneInput, "J")
      expect(screen.getByText("Invalid phone number.")).toBeInTheDocument()
      // Set phone back to valid value and check for error.
      await fireEvent.update(phoneInput, "3213213214")
      expect(screen.queryByText("Invalid phone number.")).toBeNull()
    })
  })
})
