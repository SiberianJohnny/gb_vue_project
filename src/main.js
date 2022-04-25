import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import modal from './plugins/Modal'
import editor from './plugins/Edit'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(editor)
Vue.use(modal)

new Vue({
  render: h => h(App),
  store,
  vuetify,
  router
}).$mount('#app')
