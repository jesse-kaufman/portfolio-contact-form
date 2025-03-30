<template>
  <TextInput
    v-model="modelValue"
    name="phone"
    type="tel"
    label="Your Phone"
    placeholder="3213213214"
    required
    :validator="validatePhone"
  />
</template>

<script>
/**
 * Validates phone input field.
 * @param {string} phone - Input to be validated.
 * @throws {Error} If validation fails.
 */
export const validatePhone = (phone) => {
  if (!phone.match(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i)) {
    throw Error("Invalid phone number.")
  }
}
</script>

<script setup>
import { ref } from "vue"
import TextInput from "../base/TextInput.vue"

const modelValue = ref("")
</script>
