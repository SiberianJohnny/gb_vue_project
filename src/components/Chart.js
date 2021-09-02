import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ["options"],
  watch: {
    chartData() {
      this.render()
    },
  },
  methods: {
    render() {

      this.renderChart(this.chartData, this.options);
    }
  },
  mounted() {
    this.render()
  },
};