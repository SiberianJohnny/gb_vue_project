<template>
  <div class="wrapper">
    <button @click="showForm">ADD NEW COST +</button>
  </div>
</template>

<script>
export default {
  methods: {
    showForm() {
      this.$emit("showForm");
    },
  },
};
</script>

<style scoped>
</style>