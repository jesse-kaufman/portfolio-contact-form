<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="preview-container">
    <strong>Message preview:</strong>
    <div class="preview">
      <div class="header">
        <div v-if="formData.name.value" class="input-item">
          <strong>To:</strong> Jesse Kaufman
        </div>
        <div v-if="formData.name.value" class="input-item">
          <strong>From:</strong> {{ formData.name.value }}
          <span v-if="formData.email.value">
            &lt;{{ formData.email.value }}&gt;
          </span>
        </div>
        <div v-if="formData.phone.value" class="input-item">
          <strong>Phone:</strong> {{ formData.phone.value }}
        </div>
      </div>
      <div v-if="formData.message.value" class="message input-item">
        <p v-html="formattedMessage"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"

// Props definition
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
})

// Computed property to format the message with URLs converted to links
const formattedMessage = computed(() => {
  const message = props.formData.message.value || ""
  // Regex to find URLs
  const urlPattern = /(https?:\/\/[^\s]+)/g

  // Replace URLs with anchor tags
  return message.replace(
    urlPattern,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  )
})
</script>

<style scoped>
/* Add any styling for your textarea or preview */
.input-item.message {
  white-space: pre-wrap; /* Ensures the text wraps correctly */
  word-wrap: break-word;
}
</style>
