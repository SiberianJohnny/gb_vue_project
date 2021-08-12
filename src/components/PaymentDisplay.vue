<template>
  <table>
    <tr>
      <th>#</th>
      <th>Date</th>
      <th>Category</th>
      <th>Value</th>
    </tr>
    <tr v-for="item in list" :key="item.id">
      <td>{{ item.id + 1 }}</td>
      <td>{{ item.date }}</td>
      <td class="category">{{ item.category }}</td>
      <td>{{ item.value }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
table {
  margin: 25px auto 0 auto;
  width: 60%;
}
</style>