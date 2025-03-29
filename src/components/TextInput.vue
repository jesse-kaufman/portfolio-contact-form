<template>
  <div>
    <label :for="name">{{ label }}</label>
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
const validateType = (type) => {
  const validTypes = ["text", "email", "number", "tel"]
  if (validTypes.includes(type)) return true
}
</script>

<script setup>
import { ref, defineProps, defineEmits, useAttrs } from "vue"

// Props definition
const props = defineProps({
  type: {
    type: String,
    default: "text",
    validator: validateType,
  },
  modelValue: { type: String, default: "" },
  name: { type: String, default: "" },
  label: { type: String, default: "" },
  validator: { type: Function, default: null },
  placeholder: { type: String, default: "" },
})

// Emits definition
const emit = defineEmits(["update:modelValue"])
const inputValue = ref(props.modelValue)

const updateValue = (event) => {
  const newValue = event.target.value
  if (props.validator && !props.validation(newValue)) {
  } else {
    emit("update:modelValue", newValue)
  }
}
const $attrs = useAttrs()
console.log($attrs)
</script>
