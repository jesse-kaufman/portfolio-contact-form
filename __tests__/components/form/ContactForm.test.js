/** @file ContactForm.vue tests. */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/vue"
import ContactForm from "@/components/form/ContactForm.vue"

describe("ContactForm component", () => {
  let unmount = null

  beforeEach(() => {
    const { unmount: u } = render(ContactForm)
    unmount = u

    vi.spyOn(console, "log").mockImplementation(() => {})
  })

  afterEach(() => {
    // Clean up the mock after each test
    vi.restoreAllMocks()
    unmount()
  })

  it("renders the contact form", () => {
    // Check name field.
    const nameField = screen.getByLabelText(/your name:/i)
    expect(nameField).toBeDefined()
    expect(nameField.type).toBe("text")
    expect(nameField.name).toBe("name")
    expect(nameField.value).toBe("")
    expect(nameField.placeholder).toBe("John Locke")

    // Check email field.
    const emailField = screen.getByLabelText(/your email:/i)
    expect(emailField).toBeDefined()
    expect(emailField.type).toBe("text")
    expect(emailField.name).toBe("email")
    expect(emailField.value).toBe("")
    expect(emailField.placeholder).toBe("john.locke@example.com")

    // Check phone field.
    const phoneField = screen.getByLabelText(/your phone:/i)
    expect(phoneField).toBeDefined()
    expect(phoneField.type).toBe("tel")
    expect(phoneField.name).toBe("phone")
    expect(phoneField.value).toBe("")
    expect(phoneField.placeholder).toBe("3213213214")

    // Check message field.
    const msgField = screen.getByLabelText(/message:/i)
    expect(msgField).toBeDefined()
    expect(msgField.value).toBe("")
    expect(msgField.name).toBe("message")
    expect(msgField.placeholder).toBe("Type your message here.")

    // Check submit button.
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled()
  })

  // Tests for component interaction.
  describe("interaction", () => {
    // Test setting a valid value.
    it("updates state correctly", async () => {
      // Render(ContactForm)

      const nameInput = screen.getByLabelText("Your Name:")
      const emailInput = screen.getByLabelText("Your Email:")
      const phoneInput = screen.getByLabelText("Your Phone:")
      const messageInput = screen.getByLabelText("Message:")

      await fireEvent.update(nameInput, "John Doe")
      await fireEvent.update(emailInput, "john@example.com")
      await fireEvent.update(phoneInput, "1234567890")
      await fireEvent.update(messageInput, "This is a message")

      expect(nameInput.value).toBe("John Doe")
      expect(emailInput.value).toBe("john@example.com")
      expect(phoneInput.value).toBe("1234567890")
      expect(messageInput.value).toBe("This is a message")
    })

    it("disables the submit button if the form is not valid", () => {
      //Render(ContactForm)

      const submitButton = screen.getByText("Submit")
      expect(submitButton).toBeDisabled()
    })

    it("enables the submit button when the form is valid", async () => {
      // Simulate filling out the form with valid data
      const nameInput = screen.getByLabelText("Your Name:")
      const emailInput = screen.getByLabelText("Your Email:")
      const phoneInput = screen.getByLabelText("Your Phone:")
      const messageInput = screen.getByLabelText("Message:")

      await fireEvent.update(nameInput, "John Doe")
      await fireEvent.update(emailInput, "john@example.com")
      await fireEvent.update(phoneInput, "1234567890")
      await fireEvent.update(messageInput, "This is a message")

      const submitButton = screen.getByText("Submit")
      expect(submitButton).not.toBeDisabled()
    })

    it("submits the form when the submit button is clicked", async () => {
      const nameInput = screen.getByLabelText("Your Name:")
      const emailInput = screen.getByLabelText("Your Email:")
      const phoneInput = screen.getByLabelText("Your Phone:")
      const messageInput = screen.getByLabelText("Message:")
      const submitButton = screen.getByText("Submit")

      // Simulate valid input data
      await fireEvent.update(nameInput, "John Doe")
      await fireEvent.update(emailInput, "john@example.com")
      await fireEvent.update(phoneInput, "1234567890")
      await fireEvent.update(messageInput, "This is a message")

      // Submit the form
      await fireEvent.click(submitButton)

      expect(console.log).toHaveBeenCalledWith("Form submitted with data:")
    })
  })
})
