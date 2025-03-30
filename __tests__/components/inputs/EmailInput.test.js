/** @file EmailInput component tests. */

import { describe, it, expect } from "vitest"
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

  // Tests for component interaction.
  describe("interaction", () => {
    it("binds the value correctly with v-model", async () => {
      const { getByLabelText } = render(EmailInput)
      const input = getByLabelText("Your Email:")
      await fireEvent.update(input, "john.lock@example.com")
      expect(input.value).toBe("john.lock@example.com")
    })
  })

  // Tests for component validation.
  describe("validation", () => {
    it("validates value correctly with v-model", async () => {
      const { getByText, getByLabelText } = render(EmailInput)
      const input = getByLabelText("Your Email:")
      await fireEvent.update(input, "J")
      expect(getByText("Invalid email address.")).toBeInTheDocument()
    })
  })
})
