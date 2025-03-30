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
        <p>{{ formData.message.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props definition
defineProps({
  formData: {
    type: Object,
    required: true,
  },
})
</script>
