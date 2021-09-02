<template>
  <div class="editor__wrapper">
    <v-text-field type="number" v-model.number="value" label="Value" />
    <v-select v-model="category" :items="options" label="Category"> </v-select>
    <v-text-field v-model="date" label="Date" />
    <v-btn color="teal" dark @click="saveChanges" class="btn">
      Save changes
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Editor",
  data() {
    return {
      rowID: this.$store.state.rowToChange,
      value: "",
      category: "",
      date: "",
    };
  },
  methods: {
    saveChanges() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: +this.value,
        id: this.rowID - 1,
      };
      this.$store.commit("addChangesToPaymentsList", data);
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
  mounted() {
    this.value = this.$store.state.paymentsList[this.rowID - 1].value;
    this.category = this.$store.state.paymentsList[this.rowID - 1].category;
    this.date = this.$store.state.paymentsList[this.rowID - 1].date;
  },
};
</script>

<style>
</style>