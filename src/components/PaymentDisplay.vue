<template>
  <table>
    <tr>
      <th>#</th>
      <th>Date</th>
      <th>Category</th>
      <th>Value</th>
    </tr>
    <tr class="table__row" v-for="item in list" :key="item.id" :id="item.id">
      <td>{{ item.id }}</td>
      <td>{{ item.date }}</td>
      <td class="category">{{ item.category }}</td>
      <td>{{ item.value }}</td>
      <td class="table__editor-cell">
        <button :id="item.id" @click="showEditor(item.id)">Change</button>
        <transition name="fade">
          <editor
            :id="item.id"
            v-if="editorShow && item.id === editorRowNumber"
          />
        </transition>
      </td>
    </tr>
  </table>
</template>

<script>
import Editor from "./Editor.vue";

export default {
  name: "PaymentDisplay",
  components: {
    Editor,
  },
  data() {
    return {
      editorShow: false,
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
    showEditor(id) {
      this.$editor.showEditor(id);
    },
    onEditor(id) {
      this.editorShow = !this.editorShow;
      this.editorRowNumber = id;
    },
    onDeleteRow(rowID) {
      this.$store.commit("removeDataFromPaymentsList", rowID - 1);
      this.editorShow = false;
    },
  },
  mounted() {
    this.$editor.EventBus.$on("showEditor", this.onEditor);
    this.$editor.EventBus.$on("deleteRow", this.onDeleteRow);
  },
  beforeDestroy() {
    this.$editor.EventBus.$off("showEditor", this.onEditor);
    this.$editor.EventBus.$off("deleteRow", this.onDeleteRow);
  },
};
</script>

<style scoped>
table {
  margin: 25px auto 0;
  width: 60%;
}
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