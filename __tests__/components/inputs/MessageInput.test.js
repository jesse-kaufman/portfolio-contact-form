/** @file MessageInput component test. */
/* eslint-disable max-lines-per-function */
import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/vue"
import { mount } from "@vue/test-utils"
import MessageInput from "@/components/inputs/MessageInput.vue"

describe("MessageInput.vue", () => {
  // Test component rendering.
  it("renders the message box correctly", () => {
    render(MessageInput)

    // Get component object for testing.
    const input = screen.getByLabelText("Message:")

    // Check component for proper render.
    expect(input).toBeInTheDocument()
    expect(input.placeholder).toBe("Type your message here.")
    expect(input.name).toBe("message")
    expect(input.id).toBe("message")
  })

  // Test message input validation.
  describe("input validation", () => {
    const instance = mount(MessageInput).vm

    it("validates proper message", () => {
      // Test validating valid message.
      expect(() => instance.validateMessage("This is a message.")).not.toThrow()
    })

    it("throws an error for invalid message", () => {
      expect(() => instance.validateMessage("Hey.")).toThrow()
    })
  })

  // Tests for component interaction.
  describe("interaction", () => {
    // Tests for component interaction.
    it("binds the value correctly with v-model", async () => {
      // Message to send and check for.
      const message = "This is my message."
      // Render message.
      render(MessageInput)

      // Get input and update.
      const input = screen.getByLabelText("Message:")
      await fireEvent.update(input, message)

      // Message value should match message sent.
      expect(input.value).toBe(message)
    })

    // Test setting an invalid value.
    it("throws error when setting invalid data with v-model", async () => {
      render(MessageInput)

      // Get input and update.
      const input = screen.getByLabelText("Message:")
      await fireEvent.update(input, "A")

      // Expect error to be displayed.
      expect(
        screen.getByText("Message must be at least 10 characters long.")
      ).toBeInTheDocument()
    })
  })
})
