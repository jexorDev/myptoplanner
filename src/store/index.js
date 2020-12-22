import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dateOfHire: "",
    isDeveloper: false,
    flexDayReferenceDate: "",
    plans: [],
      ptoDates: []
  },
  mutations: {
    setState(state, payload) {
      state.dateOfHire = payload.dateOfHire;
      state.plans = [...payload.plans]
    },
    setHireDate(state, hireDate) {
      state.dateOfHire = hireDate;
    },
    addPlan(state, plan) {
      state.plans = [...state.plans, plan];
    },
    
  },
  actions: {
    setState({ commit }, payload) {
      commit('setState', payload);
    },
    setHireDate({ commit, state }, payload) {
      commit('setHireDate', payload);
      localStorage.setItem('state', JSON.stringify(state));
    },
    addPlan({ commit, state }, payload) {
      commit('addPlan', payload);
      localStorage.setItem('state', JSON.stringify(state));
    }
  },
  getters: {
    planNames: state => {
      return state.plans.map(plan => plan.name);
    },
    plannedPtoTotal: state => {
      return state.ptoDates.length > 0 ? state.ptoDates.reduce((accumulator, currentValue) => accumulator + currentValue) : 60
    }
  },
  modules: {
  }
})

