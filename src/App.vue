<template>
  <div id="app">
    <header class="app__header">
      <h1 class="app__title">My personal costs</h1>
      <Button @showForm="showForm" />
      <add-payment-form @addNewPayment="newPayment" v-if="show" />
    </header>
    <main>
      <PaymentDisplay :list="paymentsList" />
    </main>
    <footer>
      <pagination />
    </footer>
  </div>
</template>

<script>
import AddPaymentForm from "./components/AddPaymentForm.vue";
import Button from "./components/Button.vue";
import Pagination from "./components/Pagination.vue";
import PaymentDisplay from "./components/PaymentDisplay.vue";

export default {
  name: "App",
  components: {
    PaymentDisplay,
    AddPaymentForm,
    Button,
    Pagination,
  },
  data() {
    return {
      paymentsList: [],
      show: false,
    };
  },
  methods: {
    fetchData() {
      return [
        {
          date: "28.03.2020",
          category: "Food",
          value: 169,
        },
        {
          date: "24.03.2020",
          category: "Transport",
          value: 360,
        },
        {
          date: "24.03.2020",
          category: "Food",
          value: 532,
        },
        {
          date: "28.03.2020",
          category: "Food",
          value: 169,
        },
        {
          date: "24.03.2020",
          category: "Transport",
          value: 360,
        },
        {
          date: "24.03.2020",
          category: "Food",
          value: 532,
        },
        {
          date: "28.03.2020",
          category: "Food",
          value: 169,
        },
        {
          date: "24.03.2020",
          category: "Transport",
          value: 360,
        },
        {
          date: "24.03.2020",
          category: "Food",
          value: 532,
        },
      ];
    },
    newPayment(paymentData) {
      this.paymentsList.push(paymentData);
    },
    showForm() {
      this.show = !this.show;
    },
  },
  created() {
    this.paymentsList = this.fetchData();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
