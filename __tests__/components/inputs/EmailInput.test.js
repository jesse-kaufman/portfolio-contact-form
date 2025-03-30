/** @file EmailInput component tests. */

import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/vue"
import { mount } from "@vue/test-utils"
import EmailInput from "@/components/inputs/EmailInput.vue"

describe("EmailInput.vue", () => {
  // Tests for component rendering.
  describe("rendering", () => {
    it("renders the input with the correct label", () => {
      const { getByLabelText } = render(EmailInput)
      expect(getByLabelText("Your Email:")).toBeInTheDocument()
    })
  })

  // Test email input validation.
  describe("input validation", () => {
    it("validates proper email", () => {
      const instance = mount(EmailInput).vm
      expect(() =>
        instance.validateEmail("john.locke@example.com")
      ).not.toThrow()
    })

    it("throws an error for invalid email", () => {
      const instance = mount(EmailInput).vm
      expect(() => instance.validateEmail("john locke@example")).toThrow()
      expect(() => instance.validateEmail("Sayid")).toThrow()
    })
  })

  // Tests for component interaction.
  describe("interaction", () => {
    // Test setting a valid value.
    it("binds the value correctly with v-model", async () => {
      const { getByLabelText } = render(EmailInput)
      const input = getByLabelText("Your Email:")
      await fireEvent.update(input, "john.lock@example.com")
      expect(input.value).toBe("john.lock@example.com")
    })

    // Test setting an invalid value.
    it("throws error when setting invalid data with v-model", async () => {
      const { getByText, getByLabelText } = render(EmailInput)
      const input = getByLabelText("Your Email:")
      await fireEvent.update(input, "J")
      expect(getByText("Invalid email address.")).toBeInTheDocument()
    })
  })
})
