<template>
  <v-container>
    <v-row>
      <v-col :cols="1">#</v-col>
      <v-col :cols="3">Date</v-col>
      <v-col :cols="5">Category</v-col>
      <v-col :cols="2">Value</v-col>
    </v-row>
    <v-row class="table__row" v-for="item in list" :key="item.id" :id="item.id">
      <v-col :cols="1">{{ item.id }}</v-col>
      <v-col :cols="3">{{ item.date }}</v-col>
      <v-col :cols="5" class="category">{{ item.category }}</v-col>
      <v-col :cols="2">{{ item.value }}</v-col>
      <v-col :cols="1" class="table__editor-cell">
        <button :id="item.id" @click="showEditor($event, item)">
          <v-icon>mdi-dots-vertical</v-icon>
        </button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PaymentDisplay",
  components: {},
  data() {
    return {
      editorRowNumber: "",
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    showEditor(event, item) {
      const id = item.id;
      const items = [
        {
          icon: "mdi-pencil-outline",
          text: "Edit",
          action: () => {
            this.$modal.show("addChangesForm", {
              header: "Edit payment № " + item.id,
            });
          },
        },
        {
          icon: "mdi-delete",
          text: "Delete",
          action: () => {
            this.$store.commit("removeDataFromPaymentsList", id - 1);
          },
        },
      ];
      this.$store.commit("setCurrentRow", id);
      this.$editor.showEditor({ event, items });
    },
  },
};
</script>

<style scoped>
.table__editor-cell {
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>