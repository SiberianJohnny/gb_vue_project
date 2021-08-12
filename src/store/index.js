import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categories: []
  },

  mutations: {
    setPaymentsListData(state, payload) {
      state.paymentsList = payload
    },
    addDataToPaymentsList(state, payload) {
      state.paymentsList.push(payload)
    },
    addDataToCategoriesList(state, payload) {
      state.categories.push(payload.newCategorie)
    },
    setCategoriesListData(state, payload) {
      state.categories = payload
    }
  },

  getters: {

    getPaymentsList: state => state.paymentsList,

    getFullPaymentsValue: state => {
      return state.paymentsList.reduce((res, cur) => res + cur.value, 0)
    },

    getCategories: state => state.categories
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
              category: "something",
              value: i,
              id: i
            })
            // items.push({
            //   page1: [{
            //     date: "11.11.1111",
            //     category: "something",
            //     value: i,
            //     id: i
            //   },
            //   {
            //     date: "11.11.1111",
            //     category: "something",
            //     value: i,
            //     id: i
            //   }]
            // })
          }
          resolve(items)
        }, 2000);
      })
        .then(res => commit('setPaymentsListData', res))
    },

    fetchCategoryList({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const categories = ['Sport', 'Food', 'Education', 'Entertainment', 'Navigation', 'Other']
          resolve(categories)
        }, 500);
      })
        .then(res => commit('setCategoriesListData', res))
    }
  },
})