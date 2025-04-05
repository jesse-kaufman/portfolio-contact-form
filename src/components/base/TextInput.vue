<template>
  <div class="input-text">
    <label :for="name">{{ label }}:</label>
    <input
      :id="name"
      v-model="model"
      v-bind="$attrs"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :class="{ 'input-error': error }"
      @input="updateValue"
    />
    <div v-if="error" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
/** Allowed values for type prop. */
export const validTypes = ["text", "email", "number", "tel"]

/**
 * Validates type prop.
 * @param {string} type - Value for type prop on InputText.
 * @returns {boolean} True if valid.
 * @throws {TypeError} If type is not a string.
 * @throws {Error} If type is not in validTypes.
 */
export const validateTypeProp = (type) => {
  if (typeof type !== "string") throw new TypeError("Type must be a string.")

  if (!validTypes.includes(type)) {
    throw new Error(
      `Invalid type: ${type}; must be one of: ${validTypes.join(", ")}`
    )
  }

  return true
}
</script>

<script setup>
import { ref } from "vue"

const model = defineModel({ type: String, default: "" })

// Props definition
const props = defineProps({
  type: {
    type: String,
    default: "text",
    validator: validateTypeProp,
  },
  name: { type: String, default: "" },
  label: { type: String, default: "" },
  validator: { type: Function, default: null },
  placeholder: { type: String, default: "" },
})

// Emits definition
const emit = defineEmits(["update:error"])
const error = ref(false) // Error state
const errorMessage = ref("") // Error message

const updateValue = (event) => {
  const newValue = event.target.value

  // Reset error state.
  error.value = false
  errorMessage.value = ""

  // Emit update event if no validator is set.
  if (props.validator == null) {
    model.value = newValue
    console.log("no validator")
  } else {
    try {
      props.validator(newValue)
      console.log("validated")
      // Update value if valid.
      model.value = newValue
    } catch (err) {
      // Set error state and message.
      error.value = true
      errorMessage.value = err.message
    }

    emit("update:error", error.value)
  }
}
</script>
