<template>
  <div class="wrapper">
    <v-text-field type="number" v-model.number="value" label="Value" />
    <v-select v-model="category" :items="options" label="Category">
      <!-- <option v-for="(option, idx) in options" :value="option" :key="idx">
        {{ option }}
      </option> -->
    </v-select>
    <v-text-field v-model="date" label="Date" />
    <v-btn color="teal" dark @click="addNewPayment" class="btn">
      ADD <v-icon>mdi-plus</v-icon>
    </v-btn>
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
      this.$modal.hide();
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