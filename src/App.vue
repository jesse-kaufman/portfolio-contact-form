<script setup>
import ContactForm from "./components/form/ContactForm.vue"
</script>

<template>
  <main>
    <ContactForm />
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }
}
</style>
