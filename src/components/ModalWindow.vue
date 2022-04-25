<template>
  <div class="modal__wrapper text-h5">
    <div class="modal__header">{{ modalWindowSettings.header }}</div>
    <div class="modal__main">
      <component :is="modalWindowSettings.name" />
    </div>
    <div class="modal__footer">
      <v-btn class="close-btn mt-2" @click="$modal.hide()">Close Form</v-btn>
    </div>
  </div>
</template>

<script>
import AddPaymentForm from "./AddPaymentForm.vue";
import AddCategorie from "./AddCategorie.vue";
import Authentication from "./Authentication.vue";
import AddChangesForm from "./AddChangesForm.vue";

export default {
  name: "ModalWindow",
  components: { AddPaymentForm, Authentication, AddCategorie, AddChangesForm },
  props: {
    modalWindowSettings: Object,
  },
  methods: {},
};
</script>

<style scoped>
</style>