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
import { validateName } from "../../services/validation"
import TextInput from "../base/TextInput.vue"

const modelValue = ref("")
</script>
