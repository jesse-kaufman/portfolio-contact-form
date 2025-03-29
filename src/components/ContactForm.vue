<template>
  <form @submit.prevent="handleSubmit">
    <TextInput
      v-model="formData.name"
      label="Your Name"
      name="name"
      type="text"
    />
    <div class="input-submit">
      <button type="submit" disabled>Submit</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue"
import TextInput from "./TextInput.vue"

const formData = ref({
  name: "",
})

const handleSubmit = () => {
  console.log("Form submitted with data:", formData.value)
}
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>
