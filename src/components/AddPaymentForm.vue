<template>
  <div class="wrapper">
    <input type="number" placeholder="Payment value" v-model.number="value" />
    <input placeholder="Payment category" v-model="category" />
    <input placeholder="Payment date" v-model="date" />
    <button @click="addNewPayment" class="btn">ADD +</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      category: "",
      date: "",
    };
  },
  methods: {
    addNewPayment() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: +this.value,
      };
      this.$emit("addNewPayment", data);
    },
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
};
</script>

<style scoped>
</style>