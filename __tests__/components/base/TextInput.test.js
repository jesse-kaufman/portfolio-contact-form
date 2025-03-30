/** @file TextInput component tests. */
/* eslint-disable max-lines-per-function */
import { describe, expect, it } from "vitest"
import { fireEvent, render } from "@testing-library/vue"

import TextInput, {
  validateTypeProp,
  validTypes,
} from "@/components/base/TextInput.vue"

describe("TextInput.vue", () => {
  // Tests for prop validation routines.
  describe("prop validation", () => {
    it("validates valid type prop", () => {
      validTypes.forEach((type) => {
        expect(() => validateTypeProp(type)).not.toThrow()
      })
    })

    it("throws error for invalid type prop", () => {
      expect(() => validateTypeProp("invalid")).toThrow()
      expect(() => validateTypeProp(1)).toThrow()
    })
  })

  // Tests for component rendering.
  describe("rendering", () => {
    it("renders the input with the correct label", () => {
      const { getByLabelText } = render(TextInput, {
        props: {
          label: "Name",
          name: "name",
          type: "text",
        },
      })
      expect(getByLabelText("Name:")).toBeInTheDocument()
    })

    it("renders the placeholder correctly", () => {
      const { getByPlaceholderText } = render(TextInput, {
        props: {
          label: "Name",
          name: "name",
          type: "text",
          placeholder: "John Locke",
        },
      })
      const input = getByPlaceholderText("John Locke")
      expect(input).toBeInTheDocument()
    })

    it("renders the input with the correct type", () => {
      const { getByLabelText } = render(TextInput, {
        props: {
          label: "Name",
          name: "name",
          type: "text",
        },
      })
      const input = getByLabelText("Name:")
      expect(input.type).toBe("text")

      render(TextInput, {
        props: {
          label: "Phone",
          name: "phone",
          type: "tel",
        },
      })
      const input2 = getByLabelText("Phone:")
      expect(input2.type).toBe("tel")
    })
  })

  // Tests for component interaction.
  describe("interaction", () => {
    it("binds the value correctly with v-model", async () => {
      const { getByLabelText } = render(TextInput, {
        props: {
          label: "Email",
          name: "email",
        },
      })
      const input = getByLabelText("Email:")
      await fireEvent.update(input, "test@example.com")
      expect(input.value).toBe("test@example.com")
    })
  })
})
