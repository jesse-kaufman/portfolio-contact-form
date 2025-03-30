<template>
  <form @submit.prevent="handleSubmit">
    <TextInput
      v-model="formData.name"
      label="Your Name"
      name="name"
      type="text"
      :validator="validateName"
      required
      placeholder="John Locke"
    />
    <TextInput
      v-model="formData.email"
      label="Your Email"
      name="email"
      type="text"
      :validator="validateEmail"
      required
      placeholder="john.locke@example.com"
    />
    <TextInput
      v-model="formData.phone"
      label="Your Phone"
      name="phone"
      type="tel"
      :validator="validatePhone"
      placeholder="3213213214"
    />
    <MessageInput v-model="formData.message"></MessageInput>
    <div class="input-submit">
      <button type="submit" disabled>Submit</button>
    </div>
  </form>

  <Preview v-if="hasData()" :form-data="formData"></Preview>
</template>

<script setup>
import { reactive } from "vue"
import {
  validateEmail,
  validateName,
  validatePhone,
} from "../../services/validation"
import TextInput from "../inputs/TextInput.vue"
import MessageInput from "../inputs/MessageInput.vue"
import Preview from "./FormPreview.vue"

const formData = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
})

/**
 * Checks if form state has any valid data.
 * @returns {boolean} True if any field has input, otherwise false.
 */
const hasData = () => {
  console.log(Object.keys(formData))
  return Object.keys(formData).filter((prop) => formData[prop] !== "").length
}

const handleSubmit = () => {
  console.log("Form submitted with data:", formData.value)
}
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>
