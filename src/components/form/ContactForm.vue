<template>
  <form @submit.prevent="handleSubmit">
    <NameInput v-model="formData.name" />
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
import { validateEmail, validatePhone } from "../../services/validation"
import TextInput from "../base/TextInput.vue"
import MessageInput from "../inputs/MessageInput.vue"
import NameInput from "../inputs/NameInput.vue"
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
