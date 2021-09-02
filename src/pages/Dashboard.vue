<template>
  <v-container>
    <v-row>
      <v-col>
        <header>
          <div class="app__title text-h5 text-sm-h3 mb-8">
            My personal costs
          </div>
          <v-dialog v-model="dialog">
            <template v-slot:activator="{ on }">
              <v-btn
                color="teal"
                dark
                class="show-btn"
                @click="showCategorieForm"
                v-on="on"
              >
                Add new category
              </v-btn>
              <v-btn
                color="teal"
                dark
                class="show-btn mr-3"
                @click="showPaymentForm"
                v-on="on"
              >
                ADD NEW COST <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card class="text-left pa-8">
              <modal-window :modalWindowSettings="modalWindowSettings" />
            </v-card>
          </v-dialog>
        </header>
        <main>
          Total Value: {{ getFPV }}
          <PaymentDisplay :list="currentElement" />
          <context-menu />
          <pagination
            :cur="page"
            :n="n"
            :length="paymentsList.length"
            @changePage="onChangePage"
          />
        </main>
      </v-col>
      <v-col>
        <div class="app__title mb-4 mt-8">Costs by categories</div>
        <chart
          :chart-data="chartData"
          :options="chartOptions"
          chart:render
        ></chart>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import Chart from "../components/Chart";
import ContextMenu from "../components/ContextMenu.vue";
import ModalWindow from "../components/ModalWindow.vue";
import Pagination from "../components/Pagination.vue";
import PaymentDisplay from "../components/PaymentDisplay.vue";

export default {
  name: "Dashboard",
  components: {
    PaymentDisplay,
    Pagination,
    ModalWindow,
    ContextMenu,
    Chart,
  },
  data() {
    return {
      currentPage: "dashboard",
      page: 1,
      n: 5,
      dialog: false,
      modalWindowSettings: {},
      chartData: {},
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Costs by categories",
          },
        },
      },
      outcome: [],
      chartCategories: [],
      chartColors: [],
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
    onModalOpen(settings) {
      this.modalWindowSettings = settings;
      this.dialog = true;
    },
    onModalClose() {
      this.modalWindowSettings = {};
      this.dialog = false;
    },
    fillChartData() {
      this.chartData = {
        labels: this.chartCategories,
        datasets: [
          {
            backgroundColor: this.chartColors,
            data: this.outcome,
          },
        ],
      };
    },
    getChartData() {
      this.$store.state.categories.forEach((category) => {
        let categoryOutcome = 0;
        this.$store.state.paymentsList.forEach((item) => {
          if (category === item.category) {
            categoryOutcome += item.value;
          }
        });
        this.outcome.push(categoryOutcome);
        this.chartCategories.push(category);
        this.chartColors.push(
          "#" + (((1 << 24) * Math.random()) | 0).toString(16)
        );
      });
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
  mounted() {
    this.$modal.EventBus.$on("show", this.onModalOpen);
    this.$modal.EventBus.$on("hide", this.onModalClose);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("show", this.onModalOpen);
    this.$modal.EventBus.$off("hide", this.onModalClose);
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

    this.getChartData();
    this.fillChartData();
  },
};
</script>

<style lang="scss" scoped>
</style>