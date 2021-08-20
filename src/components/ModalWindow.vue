<template>
  <div class="modal__wrapper">
    <div class="modal__header">{{ modalWindowSettings.header }}</div>
    <div class="modal__main">
      <component :is="modalWindowSettings.name" />
    </div>
    <div class="modal__footer">
      <button class="close-btn" @click="$modal.hide()">Close Form</button>
    </div>
  </div>
</template>

<script>
import AddPaymentForm from "./AddPaymentForm.vue";
import AddCategorie from "../components/AddCategorie.vue";
import Authentication from "./Authentication.vue";

export default {
  name: "ModalWindow",
  components: { AddPaymentForm, Authentication, AddCategorie },
  props: {
    modalWindowSettings: Object,
  },
  methods: {},
};
</script>

<style scoped>
.modal__wrapper {
  background: lightblue;
  padding: 20px;
  margin-top: 20px;
}
.close-btn {
  margin-top: 10px;
}
</style>