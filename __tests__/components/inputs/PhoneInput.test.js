/** @file PhoneInput component tests. */

import { describe, it, expect } from "vitest"
import { render, fireEvent } from "@testing-library/vue"
import PhoneInput from "@/components/inputs/PhoneInput.vue"

describe("PhoneInput.vue", () => {
  // Tests for component rendering.
  describe("rendering", () => {
    it("renders the input with the correct label", () => {
      const { getByLabelText } = render(PhoneInput)
      expect(getByLabelText("Your Phone:")).toBeInTheDocument()
    })
  })

  // Tests for component interaction.
  describe("interaction", () => {
    it("binds the value correctly with v-model", async () => {
      const { getByLabelText } = render(PhoneInput)
      const input = getByLabelText("Your Phone:")
      await fireEvent.update(input, "3213213214")
      expect(input.value).toBe("3213213214")
    })
  })

  // Tests for component validation.
  describe("validation", () => {
    it("validates value correctly with v-model", async () => {
      const { getByText, getByLabelText } = render(PhoneInput)
      const input = getByLabelText("Your Phone:")
      await fireEvent.update(input, "J")
      expect(getByText("Invalid phone number.")).toBeInTheDocument()
    })
  })
})
