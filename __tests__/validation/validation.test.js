/* eslint-disable max-lines-per-function */
/** @file Validation tests for contact form. */
import { describe, expect, it } from "vitest"
import {
  validateMessage,
  validateEmail,
  validateName,
  validatePhone,
} from "@/services/validation"

describe("Contact form validation", () => {
  describe("email", () => {
    it("validates proper email", () => {
      expect(() => validateEmail("john.locke@example.com")).not.toThrowError()
    })

    it("throws an error for invalid email", () => {
      expect(() => validateEmail("john locke@example")).toThrowError()
      expect(() => validateEmail("Sayid")).toThrowError()
    })
  })

  describe("name", () => {
    it("validates proper name", () => {
      // Test if first name only was provided.
      expect(() => validateName("Jack")).not.toThrowError()
      // Test if full name was provided.
      expect(() => validateName("Jack Sawyer")).not.toThrowError()
      // Test if extra-long full name was provided.
      expect(() => validateName("Jack L. Sawyer III")).not.toThrowError()
    })

    it("throws an error for invalid name", () => {
      // Test too-short name.
      expect(() => validateName("a")).toThrowError()
      // Test too-long name.
      // eslint-disable-next-line no-magic-numbers
      expect(() => validateName("a".repeat(255))).toThrowError()
    })
  })

  // Test phone field.
  describe("phone", () => {
    it("validates proper phone", () => {
      // Test multiple valid phone number formats.
      expect(() => validatePhone("3213213214")).not.toThrowError()
      expect(() => validatePhone("(321) 321-3214")).not.toThrowError()
      expect(() => validatePhone("321-321-3214")).not.toThrowError()
    })

    it("throws an error for invalid email", () => {
      expect(() => validatePhone("481516")).toThrowError()
    })
  })

  // Test message input validation.
  describe("message", () => {
    it("validates proper message", () => {
      // Test validating valid message.
      expect(() => validateMessage("This is a message.")).not.toThrowError()
    })

    it("throws an error for invalid message", () => {
      expect(() => validateMessage("Hey.")).toThrowError()
    })
  })
})
