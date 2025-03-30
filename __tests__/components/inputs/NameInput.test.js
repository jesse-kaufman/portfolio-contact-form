/** @file NameInput component tests. */

import { describe, it, expect } from "vitest"
import { render, fireEvent } from "@testing-library/vue"
import NameInput from "@/components/inputs/NameInput.vue"

describe("NameInput.vue", () => {
  // Tests for component rendering.
  describe("rendering", () => {
    it("renders the input with the correct label", () => {
      const { getByLabelText } = render(NameInput)
      expect(getByLabelText("Your Name:")).toBeInTheDocument()
    })
  })

  // Tests for component interaction.
  describe("interaction", () => {
    it("binds the value correctly with v-model", async () => {
      const { getByLabelText } = render(NameInput)
      const input = getByLabelText("Your Name:")
      await fireEvent.update(input, "John Locke")
      expect(input.value).toBe("John Locke")
    })
  })
})
