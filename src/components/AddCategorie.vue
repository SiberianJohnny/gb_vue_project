<template>
  <div class="categorie__wrapper">
    <v-text-field
      class="categorie__input"
      type="text"
      v-model="newCategorie"
      label="New Category"
    />
    <v-btn color="teal" dark @click="addNewCategorie"
      >Categorie <v-icon>mdi-plus</v-icon></v-btn
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      newCategorie: "",
    };
  },
  methods: {
    addNewCategorie() {
      const data = {
        newCategorie: this.newCategorie,
      };
      this.$store.commit("addDataToCategoriesList", data);
      this.$modal.hide();
    },
  },
};
</script>

<style scoped>
.categorie__input {
  margin-top: 10px;
}
</style>