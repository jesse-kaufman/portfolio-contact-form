/** @file EmailInput component tests. */

import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { render, fireEvent } from "@testing-library/vue"
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
      ).not.toThrowError()
    })

    it("throws an error for invalid email", () => {
      const instance = mount(EmailInput).vm
      expect(() => instance.validateEmail("john locke@example")).toThrowError()
      expect(() => instance.validateEmail("Sayid")).toThrowError()
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
