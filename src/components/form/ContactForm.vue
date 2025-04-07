<template>
  <form @submit.prevent="handleSubmit">
    <NameInput
      v-model="formData.name.value"
      @update:error="updateError('name', $event)"
    />
    <EmailInput
      v-model="formData.email.value"
      @update:error="updateError('name', $event)"
    />
    <PhoneInput
      v-model="formData.phone.value"
      @update:error="updateError('name', $event)"
    />
    <MessageInput
      v-model="formData.message.value"
      @update:error="updateError('name', $event)"
    ></MessageInput>
    <div class="input-submit">
      <button type="submit" :disabled="!isFormValid">Submit</button>
    </div>
  </form>

  <Preview v-if="hasData" :form-data="formData"></Preview>
</template>

<script setup>
import { reactive, computed, ref } from "vue"
import axios from "axios"
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

const submitResponse = ref("")
const submitError = ref(false)

const updateError = (field, error) => {
  formData[field].error = error
}

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
const isFormValid = computed(() =>
  Object.values(formData).every((field) => !field.error && field.value !== "")
)

const handleSubmit = async () => {
  const submitData = Object.keys(formData).reduce((acc, key) => {
    // Add each 'key' with its 'value' to the accumulator (acc)
    acc[key] = formData[key].value
    return acc // Return the updated accumulator for the next iteration
  }, {}) // Initial value is an empty object
  console.log(submitData)
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/submit",
      submitData
    )

    // Save response in form state.
    submitResponse.value = "Form submitted successfully!"
    console.log(response.data)
  } catch (err) {
    // Set form error state.
    submitError.value = true
    // Save response in form state.
    submitResponse.value = err.response
      ? err.response.data.message
      : err.message
    console.error(err)
  }
}
</script>
