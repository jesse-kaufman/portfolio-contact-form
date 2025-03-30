<template>
  <TextInput
    v-model="modelValue"
    name="email"
    label="Your Email"
    placeholder="john.locke@example.com"
    required
    :validator="validateEmail"
  />
</template>

<script setup>
import { ref } from "vue"
import { validateEmail } from "../../services/validation"
import TextInput from "../base/TextInput.vue"

const modelValue = ref("")
</script>
