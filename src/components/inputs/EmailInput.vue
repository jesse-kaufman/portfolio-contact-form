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

<script>
/**
 * Validates email input field.
 * @param {string} email - Input to be validated.
 * @throws {Error} If validation fails.
 */
export const validateEmail = (email) => {
  if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)) {
    throw Error("Invalid email address.")
  }
}
</script>

<script setup>
import { ref } from "vue"
import TextInput from "../base/TextInput.vue"

const modelValue = ref("")
</script>
