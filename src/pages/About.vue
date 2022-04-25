<template>
  <div>
    About
    <div class="button">
      <button @click="showModalForm">Show Authentication form</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  methods: {
    showModalForm() {
      this.$modal.show("Authentication", { header: "Authetication Form" });
    },
  },
};
</script>

<style>
</style>