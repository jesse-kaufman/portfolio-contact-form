<template>
  <TextInput
    v-model="modelValue"
    name="name"
    label="Your Name"
    placeholder="John Locke"
    required
    :validator="validateName"
  />
</template>

<script setup>
import { ref } from "vue"
import TextInput from "../base/TextInput.vue"

const modelValue = ref("")

/**
 * Validates name input field.
 * @param {string} name - Input to be validated.
 * @throws {Error} If validation fails.
 */
const validateName = (name) => {
  // Check that name is between 2 and 254 characters.
  // eslint-disable-next-line no-magic-numbers
  if (name.length < 2 || name.length >= 255) {
    throw Error("Name must be between 2 and 254 characters long.")
  }

  if (!name.match(/^[a-z.\- ]/i)) {
    throw Error("Name contains an invalid character.")
  }
}

defineExpose({ validateName })
</script>
