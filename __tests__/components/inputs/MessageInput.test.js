/* eslint-disable max-lines-per-function */
/** @file MessageInput component test. */
import { describe, it, expect } from "vitest"
import { render, fireEvent } from "@testing-library/vue"
import MessageInput, {
  validateMessage,
} from "@/components/inputs/MessageInput.vue"

describe("MessageInput.vue", () => {
  // Test component rendering.
  it("renders the message box correctly", () => {
    const { getByLabelText } = render(MessageInput)

    // Get component object for testing.
    const input = getByLabelText("Message:")

    // Check component for proper render.
    expect(input).toBeInTheDocument()
    expect(input.placeholder).toBe("Type your message here.")
    expect(input.name).toBe("message")
    expect(input.id).toBe("message")
  })

  // Test message input validation.
  describe("input validation", () => {
    it("validates proper message", () => {
      // Test validating valid message.
      expect(() => validateMessage("This is a message.")).not.toThrowError()
    })

    it("throws an error for invalid message", () => {
      expect(() => validateMessage("Hey.")).toThrowError()
    })
  })

  // Tests for component interaction.
  describe("interaction", () => {
    // Tests for component interaction.
    it("binds the value correctly with v-model", async () => {
      // Message to send and check for.
      const message = "This is my message."
      // Render message.
      const { getByLabelText } = render(MessageInput)

      // Get input and update.
      const input = getByLabelText("Message:")
      await fireEvent.update(input, message)

      // Message value should match message sent.
      expect(input.value).toBe(message)
    })

    // Test setting an invalid value.
    it("throws error when setting invalid data with v-model", async () => {
      const { getByLabelText, getByText } = render(MessageInput)

      // Get input and update.
      const input = getByLabelText("Message:")
      await fireEvent.update(input, "A")

      // Expect error to be displayed.
      expect(
        getByText("Message must be at least 10 characters long.")
      ).toBeInTheDocument()
    })
  })
})
