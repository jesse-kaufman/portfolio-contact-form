<template>
  <div class="preview-container">
    <strong>Message preview:</strong>
    <div class="preview">
      <div class="header">
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
      <div v-if="formData.message" class="input-item">
        <p>{{ formData.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props definition
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
})
</script>
