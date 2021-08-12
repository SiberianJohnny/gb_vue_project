<template>
  <div>
    <input type="text" placeholder="Add Categorie" v-model="newCategorie" />
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
      this.$emit("addNewCategorie", data);
    },
  },
};
</script>

<style>
</style>