import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categories: [],
    rowToChange: ''
  },

  mutations: {
    setPaymentsListData(state, payload) {
      state.paymentsList = payload
    },
    addDataToPaymentsList(state, payload) {
      state.paymentsList.push(payload)
    },

    setCurrentRow(state, payload) {
      state.rowToChange = payload
    },

    addChangesToPaymentsList(state, payload) {
      state.paymentsList[payload.id].value = payload.value
      state.paymentsList[payload.id].category = payload.category
      state.paymentsList[payload.id].date = payload.date
      state.rowToChange = payload.id
    },
    removeDataFromPaymentsList(state, payload) {
      state.paymentsList.splice(payload, 1)
      for (var i = 0; i < state.paymentsList.length; i++) {
        state.paymentsList[i].id = i + 1
      }
    },

    setCategoriesListData(state, payload) {
      state.categories = payload
    },
    addDataToCategoriesList(state, payload) {
      state.categories.push(payload.newCategorie)
    },
  },

  getters: {

    getPaymentsList: state => state.paymentsList,

    getFullPaymentsValue: state => {
      return state.paymentsList.reduce((res, cur) => res + cur.value, 0)
    },

    getCategories: state => state.categories,
  },

  actions: {

    fetchData({ commit }) {
      if (this.state.paymentsList.length) return
      return new Promise((resolve) => {
        setTimeout(() => {
          const items = []
          for (let i = 0; i < 13; i++) {
            items.push({
              date: "11.11.1111",
              category: "Other",
              value: i + 1,
              id: i + 1
            })
          }
          resolve(items)
        }, 100);
      })
        .then(res => commit('setPaymentsListData', res))
    },

    fetchCategoryList({ commit }) {
      return new Promise((resolve) => {
        const categories = ['Sport', 'Food', 'Education', 'Entertainment', 'Navigation', 'Other']
        this.state.categories.push(categories)
        resolve(categories)
      })
        .then(res => commit('setCategoriesListData', res))
    }
  },
})