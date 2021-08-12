<template>
  <div id="app">
    <header class="app__header">
      <h1 class="app__title">My personal costs</h1>
      <Button @showForm="showForm" />
      <add-payment-form @addNewPayment="newPayment" v-if="show" />
      <add-categorie @addNewCategorie="newCategorie" v-if="show" />
    </header>
    <main>
      Total Value: {{ getFPV }}
      <PaymentDisplay :list="currentElement" />
    </main>
    <footer>
      <pagination
        :cur="page"
        :n="n"
        :length="paymentsList.length"
        @changePage="onChangePage"
      />
    </footer>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import AddCategorie from "./components/AddCategorie.vue";
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
    AddCategorie,
  },
  data() {
    return {
      show: false,
      page: 1,
      n: 5,
    };
  },
  methods: {
    ...mapMutations([
      "setPaymentsListData",
      "addDataToPaymentsList",
      "addDataToCategoriesList",
    ]),
    ...mapActions({
      fetchListData: "fetchData",
    }),
    // fetchData() {
    //   return [
    //     {
    //       date: "28.03.2020",
    //       category: "Food",
    //       value: 169,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Transport",
    //       value: 360,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Food",
    //       value: 532,
    //     },
    //     {
    //       date: "28.03.2020",
    //       category: "Food",
    //       value: 169,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Transport",
    //       value: 360,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Food",
    //       value: 532,
    //     },
    //     {
    //       date: "28.03.2020",
    //       category: "Food",
    //       value: 169,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Transport",
    //       value: 360,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Food",
    //       value: 532,
    //     },
    //   ];
    // },
    onChangePage(p) {
      this.page = p;
    },
    newPayment(paymentData) {
      this.addDataToPaymentsList(paymentData);
    },
    newCategorie(categorieData) {
      this.addDataToCategoriesList(categorieData);
    },
    showForm() {
      this.show = !this.show;
    },
  },

  computed: {
    ...mapGetters({
      paymentsList: "getPaymentsList",
    }),
    getFPV() {
      return this.$store.getters.getFullPaymentsValue;
    },
    currentElement() {
      const { n, page } = this;
      return this.paymentsList.slice(n * (page - 1), n * (page - 1) + n);
    },
  },

  created() {
    // this.paymentsList = this.fetchData();
    // this.#store.commit("setPaymentsListData", this.fetchData());
    // this.setPaymentsListData(this.fetchData());
    this.fetchListData();
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
