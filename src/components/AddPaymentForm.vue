<template>
  <div class="wrapper">
    <input type="number" placeholder="Payment value" v-model.number="value" />
    <select v-model="category" v-if="options">
      <option v-for="option in options" :value="option" :key="option">
        {{ option }}
      </option>
    </select>
    <!-- <input placeholder="Payment category" v-model="category" /> -->
    <input placeholder="Payment date" v-model="date" />
    <button @click="addNewPayment" class="btn">ADD +</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      value: "",
      category: "",
      date: "",
    };
  },
  methods: {
    ...mapActions(["fetchCategoryList"]),
    addNewPayment() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: +this.value,
        id: this.$store.state.paymentsList.length + 1,
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
    options() {
      return this.$store.getters.getCategories;
    },
  },
  created() {
    this.fetchCategoryList();
  },
};
</script>

<style scoped>
</style>