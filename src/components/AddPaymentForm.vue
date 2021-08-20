<template>
  <div class="wrapper">
    <input type="number" placeholder="Payment value" v-model.number="value" />
    <select v-model="category" v-if="options">
      <option v-for="(option, idx) in options" :value="option" :key="idx">
        {{ option }}
      </option>
    </select>
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
        id: this.$store.state.paymentsList.length + 1,
      };
      this.$store.commit("addDataToPaymentsList", data);
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
    const value = this.$route.query.value;
    const category = this.$route.params.category;
    if (value && category) {
      this.value = value;
      this.category = category;
      this.addNewPayment();
    } else {
      this.category = category;
      this.value = value;
    }
  },
};
</script>

<style scoped>
</style>