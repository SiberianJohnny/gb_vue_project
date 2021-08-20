<template>
  <div>
    <header>
      <h1 class="app__title">My personal costs</h1>
      <button class="show-btn" @click="showPaymentForm">
        Show Payment Form
      </button>
      <button class="show-btn" @click="showCategorieForm">
        Show Categorie Form
      </button>
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
import Pagination from "../components/Pagination.vue";
import PaymentDisplay from "../components/PaymentDisplay.vue";

export default {
  name: "Dashboard",
  components: {
    PaymentDisplay,
    Pagination,
  },
  data() {
    return {
      currentPage: "dashboard",
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
      fetchCategoryData: "fetchCategoryList",
    }),
    onChangePage(p) {
      this.page = p;
    },
    showPaymentForm() {
      this.$modal.show("addPaymentForm", { header: "Add payment Form" });
    },
    showCategorieForm() {
      this.$modal.show("addCategorie", { header: "Add category Form" });
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
    await this.fetchListData();
    await this.fetchCategoryData();

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
.show-btn {
  margin-bottom: 20px;
}
</style>