<template>
  <label for="message">Message:</label>
  <textarea
    id="message"
    v-model="model"
    name="message"
    placeholder="Type your message here."
    required
    :class="{ 'input-error': error }"
    @input="updateValue"
  ></textarea>
  <div v-if="error" class="error-message">{{ errorMessage }}</div>
</template>

<script setup>
import { ref } from "vue"

const model = defineModel({ type: String, default: "" })

// Emits definition
const emit = defineEmits(["update:error"])
const error = ref(false) // Error state
const errorMessage = ref("") // Error message

/**
 * Validates message input field.
 * @param {string} msg - Input to be validated.
 * @throws {Error} If validation fails.
 */
const validateMessage = (msg) => {
  // Check that message is at least 10 characters.
  // eslint-disable-next-line no-magic-numbers
  if (msg.length < 10) {
    throw Error("Message must be at least 10 characters long.")
  }
}

const updateValue = (event) => {
  const newValue = event.target.value

  // Reset error state.
  error.value = false
  errorMessage.value = ""

  try {
    validateMessage(newValue)
    // Emit update event if valid.
    model.value = newValue
  } catch (err) {
    // Set error state and message.
    error.value = true
    errorMessage.value = err.message
  }

  emit("update:error", error.value)
}
</script>
