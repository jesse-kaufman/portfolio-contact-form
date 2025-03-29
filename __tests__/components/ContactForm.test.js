import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/vue"
import ContactForm from "@/components/ContactForm.vue"

describe("ContactForm component", () => {
  test("renders the contact form", () => {
    render(ContactForm)

    // Check name field.
    const nameField = screen.getByLabelText(/your name/i)
    expect(nameField).toBeDefined()
    expect(nameField.type).toBe("text")
    expect(nameField.value).toBe("")
    expect(nameField.placeholder).toBe("John Locke")

    // Check email field.
    const emailField = screen.getByLabelText(/your email/i)
    expect(emailField).toBeDefined()
    expect(emailField.type).toBe("text")
    expect(emailField.value).toBe("")
    expect(emailField.placeholder).toBe("john.locke@example.com")

    // Check phone field.
    const phoneField = screen.getByLabelText(/your phone/i)
    expect(phoneField).toBeDefined()
    expect(phoneField.type).toBe("tel")
    expect(phoneField.value).toBe("")
    expect(phoneField.placeholder).toBe("3213213214")

    // Check submit button.
    expect(screen.getByRole("button", { name: /submit/i })).toBeDisabled()
  })
})
