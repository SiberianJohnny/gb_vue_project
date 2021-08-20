<template>
  <div class="editor__wrapper">
    <transition name="fade">
      <div class="editor__inputs" v-if="showEditorInputs">
        <input
          type="number"
          placeholder="Payment value"
          v-model.number="value"
        />
        <select v-model="category" v-if="options">
          <option v-for="option in options" :value="option" :key="option">
            {{ option }}
          </option>
        </select>
        <input placeholder="Payment date" v-model="date" />
        <button class="btn" @click="saveChanges">Save</button>
      </div>
    </transition>

    <button class="btn__edit" @click="openEditor">Edit</button>
    <button class="delete" @click="deleteItem">Delete</button>
  </div>
</template>

<script>
export default {
  name: "Editor",
  data() {
    return {
      rowID: "",
      showEditorInputs: false,
      value: "",
      category: "",
      date: "",
    };
  },
  methods: {
    deleteItem() {
      this.$editor.deleteRow(this.rowID);
    },
    openEditor() {
      this.showEditorInputs = !this.showEditorInputs;
    },
    saveChanges() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: +this.value,
        id: this.rowID - 1,
      };
      this.$editor.showEditor();
      this.$store.commit("addChangesToPaymentsList", data);
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
    this.rowID = this.$el.id;
    this.value = this.$store.state.paymentsList[this.rowID - 1].value;
    this.category = this.$store.state.paymentsList[this.rowID - 1].category;
    this.date = this.$store.state.paymentsList[this.rowID - 1].date;
  },
};
</script>

<style>
.editor__wrapper {
  position: absolute;
  right: 0;
  display: flex;
  position: absolute;
  background: lightblue;
  padding: 5px;
  z-index: 2;
}
.editor__inputs {
  display: flex;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>