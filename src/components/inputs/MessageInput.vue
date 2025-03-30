<template>
  <label for="message">Message:</label>
  <textarea
    id="message"
    v-model="modelValue"
    name="message"
    placeholder="Type your message here."
    required
    @input="updateValue"
  ></textarea>
</template>

<script>
/**
 * Validates message input field.
 * @param {string} msg - Input to be validated.
 * @throws {Error} If validation fails.
 */
export const validateMessage = (msg) => {
  // Check that name is between 2 and 254 characters.
  // eslint-disable-next-line no-magic-numbers
  if (msg.length < 10) {
    throw Error("Name must be at least 10 characters long.")
  }
}
</script>

<script setup>
import { ref } from "vue"

const props = defineProps({
  modelValue: { type: String, default: "" },
})

// Emits definition
const emit = defineEmits(["update:modelValue"])
const modelValue = ref(props.modelValue)

const updateValue = (event) => {
  const newValue = event.target.value

  emit("update:modelValue", newValue)
}
</script>
