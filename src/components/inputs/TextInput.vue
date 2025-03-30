<template>
  <div class="input-text">
    <label :for="name">{{ label }}:</label>
    <input
      :id="name"
      v-model="inputValue"
      v-bind="$attrs"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      @input="updateValue"
    />
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

// Props definition
const props = defineProps({
  type: {
    type: String,
    default: "text",
    validator: validateTypeProp,
  },
  modelValue: { type: String, default: "" },
  name: { type: String, default: "" },
  label: { type: String, default: "" },
  validator: { type: Function, default: null },
  placeholder: { type: String, default: "" },
})

// Emits definition
const emit = defineEmits(["update:model-value"])
const inputValue = ref(props.modelValue)

const updateValue = (event) => {
  const newValue = event.target.value

  // Emit update event if no validator is set.
  if (props.validator == null) {
    emit("update:model-value", newValue)
  }

  try {
    props.validator(newValue)
    emit("update:model-value", newValue)
  } catch (err) {
    // XXX: Display message in UI here
    console.log(err)
  }
}
</script>
