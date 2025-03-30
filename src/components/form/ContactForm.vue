<template>
  <form @submit.prevent="handleSubmit">
    <NameInput v-model="formData.name.value" />
    <EmailInput v-model="formData.email.value" />
    <PhoneInput v-model="formData.phone.value" />
    <MessageInput v-model="formData.message.value"></MessageInput>
    <div class="input-submit">
      <button type="submit" :disabled="!isFormValid">Submit</button>
    </div>
  </form>

  <Preview v-if="hasData" :form-data="formData"></Preview>
</template>

<script setup>
import { reactive, computed } from "vue"
import PhoneInput from "../inputs/PhoneInput.vue"
import EmailInput from "../inputs/EmailInput.vue"
import MessageInput from "../inputs/MessageInput.vue"
import NameInput from "../inputs/NameInput.vue"
import Preview from "./FormPreview.vue"

const formData = reactive({
  name: { value: "", error: false },
  email: { value: "", error: false },
  phone: { value: "", error: false },
  message: { value: "", error: false },
})

/**
 * Checks if form state has any valid data.
 * @returns {boolean} True if any field has input, otherwise false.
 */
const hasData = computed(
  () =>
    Object.keys(formData).filter((prop) => formData[prop].value !== "").length
)

/**
 * Checks if form is valid.
 */
const isFormValid = computed(() => {
  console.log(
    Object.values(formData).every((field) => !field.error && field.value !== "")
  )
  return Object.values(formData).every(
    (field) => !field.error && field.value !== ""
  )
})

const handleSubmit = () => {
  console.log("Form submitted with data:", formData.value)
}
</script>
