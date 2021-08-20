<template>
  <div class="categorie__wrapper">
    <input
      class="categorie__input"
      type="text"
      placeholder="Add Categorie"
      v-model="newCategorie"
    />
    <button @click="addNewCategorie">Categorie +</button>
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
    },
  },
};
</script>

<style scoped>
.categorie__input {
  margin-top: 10px;
}
</style>