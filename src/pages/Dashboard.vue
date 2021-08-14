<template>
  <div>
    <header>
      <h1 class="app__title">My personal costs</h1>
      <Button @showForm="showForm" />
      <add-payment-form @addNewPayment="newPayment" v-if="show" />
      <add-categorie @addNewCategorie="newCategorie" v-if="show" />
    </header>
    <main>
      Total Value: {{ getFPV }}
      <PaymentDisplay :list="currentElement" />
      <pagination
        :cur="page"
        :n="n"
        :length="paymentsList.length"
        @changePage="onChangePage"
      />
    </main>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import AddCategorie from "../components/AddCategorie.vue";
import AddPaymentForm from "../components/AddPaymentForm.vue";
import Button from "../components/Button.vue";
import Pagination from "../components/Pagination.vue";
import PaymentDisplay from "../components/PaymentDisplay.vue";

export default {
  name: "Dashboard",
  components: {
    PaymentDisplay,
    AddPaymentForm,
    Button,
    Pagination,
    AddCategorie,
  },
  data() {
    return {
      currentPage: "dashboard",
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

  async created() {
    // this.paymentsList = this.fetchData();
    // this.#store.commit("setPaymentsListData", this.fetchData());
    // this.setPaymentsListData(this.fetchData());
    await this.fetchListData();
    // this.$router.push({
    //   name: "Dashboard",
    // });
    const paymentAddPath = this.$route.params.add;
    if (paymentAddPath === "add") {
      this.showForm();
    }

    const page = this.$route.params.page;
    if (page) {
      this.onChangePage(page);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>