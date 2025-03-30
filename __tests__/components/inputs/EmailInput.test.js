/* eslint-disable max-lines-per-function */
/** @file EmailInput component tests. */

import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/vue"
import { mount } from "@vue/test-utils"
import EmailInput from "@/components/inputs/EmailInput.vue"

describe("EmailInput.vue", () => {
  // Tests for component rendering.
  describe("rendering", () => {
    it("renders the input with the correct label", () => {
      render(EmailInput)
      expect(screen.getByLabelText("Your Email:")).toBeInTheDocument()
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
      render(EmailInput)
      const input = screen.getByLabelText("Your Email:")
      await fireEvent.update(input, "john.lock@example.com")
      expect(input.value).toBe("john.lock@example.com")
    })

    it("shows error when invalid and removes when corrected", async () => {
      // Set email to invalid value and check for error.
      const emailInput = screen.getByLabelText("Your Email:")
      await fireEvent.update(emailInput, "J")
      expect(screen.getByText("Invalid email address.")).toBeInTheDocument()

      // Set email back to valid value and check that the error is gone.
      await fireEvent.update(emailInput, "john.lock@example.com")
      expect(screen.queryByText("Invalid email address.")).toBeNull()
    })
  })
})
