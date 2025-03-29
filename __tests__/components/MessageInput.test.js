/* eslint-disable max-lines-per-function */
import { describe, it, expect } from "vitest"
import { render, fireEvent } from "@testing-library/vue"
import MessageInput from "@/components/MessageInput.vue"

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
  })

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
})
