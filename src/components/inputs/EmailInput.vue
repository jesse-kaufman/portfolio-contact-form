<template>
  <TextInput
    v-model="modelValue"
    name="email"
    label="Your Email"
    placeholder="john.locke@example.com"
    required
    :validator="validateEmail"
  />
</template>

<script setup>
import { ref } from "vue"
import TextInput from "../base/TextInput.vue"

/**
 * Validates email input field.
 * @param {string} email - Input to be validated.
 * @throws {Error} If validation fails.
 */
const validateEmail = (email) => {
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)) {
    throw Error("Invalid email address.")
  }
}
const modelValue = ref("")
// Expose validateEmail for testing or external access
defineExpose({
  validateEmail,
})
</script>
