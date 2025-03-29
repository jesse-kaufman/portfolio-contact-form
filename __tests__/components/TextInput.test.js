/* eslint-disable max-lines-per-function */
import { describe, it, expect } from "vitest"
import { render, fireEvent } from "@testing-library/vue"
import TextInput from "@/components/TextInput.vue"

describe("TextInput.vue", () => {
  describe("rendering", () => {
    it("renders the input with the correct label", () => {
      const { getByLabelText } = render(TextInput, {
        props: {
          label: "Name",
          modelValue: "",
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
          placeholder: "Enter your name",
        },
      })
      const input = getByPlaceholderText("Enter your name")
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
    })
  })

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
