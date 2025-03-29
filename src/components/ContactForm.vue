<template>
  <form @submit.prevent="handleSubmit">
    <TextInput
      v-model="formData.name"
      label="Your Name"
      name="name"
      type="text"
      placeholder="John Locke"
    />
    <TextInput
      v-model="formData.email"
      label="Your Email"
      name="email"
      type="text"
      placeholder="john.locke@example.com"
    />
    <TextInput
      v-model="formData.phone"
      label="Your Phone"
      name="phone"
      type="tel"
      placeholder="3213213214"
    />
    <MessageInput v-model="formData.message"></MessageInput>
    <div class="input-submit">
      <button type="submit" disabled>Submit</button>
    </div>
  </form>

  <div v-if="hasData()" class="preview-container">
    <strong>Message preview:</strong>
    <div class="preview">
      <div v-if="formData.name" class="input-item">
        <strong>To:</strong> Jesse Kaufman
      </div>
      <div v-if="formData.name" class="input-item">
        <strong>From:</strong> {{ formData.name }}
        <span v-if="formData.email">&lt;{{ formData.email }}&gt;</span>
      </div>
      <div v-if="formData.phone" class="input-item">
        <strong>Phone:</strong> {{ formData.phone }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import TextInput from "./TextInput.vue"
import MessageInput from "./MessageInput.vue"

const formData = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
})

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
