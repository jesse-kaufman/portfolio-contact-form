<template>
  <label for="message">Message:</label>
  <textarea
    id="message"
    v-model="inputValue"
    name="message"
    placeholder="Type your message here."
    @input="updateValue"
  ></textarea>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  modelValue: { type: String, default: "" },
})

// Emits definition
const emit = defineEmits(["update:modelValue"])
const inputValue = ref(props.modelValue)

const updateValue = (event) => {
  const newValue = event.target.value

  emit("update:modelValue", newValue)
}
</script>
