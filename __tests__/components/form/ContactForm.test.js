/** @file ContactForm.vue tests. */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/vue"
import ContactForm from "@/components/form/ContactForm.vue"

describe("ContactForm component", () => {
  test("renders the contact form", () => {
    render(ContactForm)

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
})
