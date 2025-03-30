<template>
  <label for="message">Message:</label>
  <textarea
    id="message"
    v-model="modelValue"
    name="message"
    placeholder="Type your message here."
    required
    :class="{ 'input-error': error }"
    @input="updateValue"
  ></textarea>
  <div v-if="error" class="error-message">{{ errorMessage }}</div>
</template>

<script>
/**
 * Validates message input field.
 * @param {string} msg - Input to be validated.
 * @throws {Error} If validation fails.
 */
export const validateMessage = (msg) => {
  // Check that message is at least 10 characters.
  // eslint-disable-next-line no-magic-numbers
  if (msg.length < 10) {
    throw Error("Message must be at least 10 characters long.")
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
const error = ref(false) // Error state
const errorMessage = ref("") // Error message

const updateValue = (event) => {
  const newValue = event.target.value

  // Reset error state.
  error.value = false
  errorMessage.value = ""

  try {
    validateMessage(newValue)
    // Emit update event if valid.
    emit("update:modelValue", newValue)
  } catch (err) {
    // Set error state and message.
    error.value = true
    errorMessage.value = err.message
  }
}
</script>
