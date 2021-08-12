<template>
  <div class="pagination">
    <div class="pagination__element" @click="changePage(cur - 1)">Prev</div>
    <div
      class="pagination__element"
      v-for="page in amount"
      :key="page"
      @click="changePage(page)"
    >
      {{ page }}
    </div>
    <div class="pagination__element" @click="changePage(cur + 1)">Next</div>
  </div>
</template>

<script>
export default {
  props: {
    length: Number,
    n: {
      type: Number,
      default: 5,
    },
    cur: Number,
  },
  computed: {
    amount() {
      return Math.ceil(this.length / this.n);
    },
  },
  methods: {
    changePage(p) {
      if (p < 1 || p > this.amount) {
        return;
      }
      this.$emit("changePage", p);
    },
  },
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  &__element {
    margin: 10px;
  }
}
</style>