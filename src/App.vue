<template>
  <div id="app">
    <header class="app__header">
      <div class="page-links">
        <router-link to="/dashboard">Dashboard</router-link> /
        <router-link to="/about">About</router-link>
      </div>

      <router-view />

      <!-- <dashboard v-if="currentPage === dashboard" />           |Навигация без роутера|
      <about v-if="currentPage === about" />
      <page-404 v-if="currentPage === 404" /> -->
    </header>
  </div>
</template>

<script>
export default {
  name: "App",

  methods: {
    // setPage() {
    //   this.page = location.pathname.slice(1);    |Навигация без роутера|
    // },
  },

  mounted() {
    // const links = document.querySelectorAll("a");
    // links.forEach((link) => {
    //   link.addEventListener("click", (event) => {    |Навигация без роутера|
    //     event.preventDefault();
    //     history.pushState({}, "", link.href);
    //     this.setPage();
    //   });
    // });
    // window.addEventListener("popstate", this.setPage);
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
