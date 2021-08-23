<template>
  <div id="app">
    <div class="app__header">
      <div class="page-links">
        <router-link to="/dashboard">Dashboard</router-link> /
        <router-link to="/about">About</router-link> /
        <router-link to="/calc">Calculator</router-link>
      </div>

      <ModalWindow
        v-if="modalShow"
        :modalWindowSettings="modalWindowSettings"
      />

      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    ModalWindow: () => import("./components/ModalWindow.vue"),
  },
  data() {
    return {
      modalShow: false,
      modalWindowSettings: {},
    };
  },
  methods: {
    onModalOpen(settings) {
      this.modalWindowSettings = settings;
      this.modalShow = true;
    },
    onModalClose() {
      this.modalWindowSettings = {};
      this.modalShow = false;
    },
  },

  mounted() {
    this.$modal.EventBus.$on("show", this.onModalOpen);
    this.$modal.EventBus.$on("hide", this.onModalClose);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("show", this.onModalOpen);
    this.$modal.EventBus.$off("hide", this.onModalClose);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
