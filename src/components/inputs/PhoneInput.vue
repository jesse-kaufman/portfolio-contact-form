<template>
  <TextInput
    v-model="modelValue"
    name="phone"
    label="Your Phone"
    placeholder="3213213214"
    required
    :validator="validatePhone"
  />
</template>

<script setup>
import { ref } from "vue"
import { validatePhone } from "../../services/validation"
import TextInput from "../base/TextInput.vue"

const modelValue = ref("")
</script>
