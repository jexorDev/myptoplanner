import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPlan: "",
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
    setSelectedPlan(state, payload) {
      console.log('setting plan')
      state.selectedPlan = {...payload};
    },
    setHireDate(state, hireDate) {
      state.dateOfHire = hireDate;
    },
    addPlan(state, plan) {
      state.plans = [...state.plans, plan];
    },
    removePlan(state, payload) {
      state.plans = [...state.plans.filter(plan => plan.name !== payload.name)];
    },
    addPto(state, payload) {
      const newDates = [];
      for (let pto of payload.pto) {
        newDates.push({ plan: payload.planName, date: pto.date, hours: pto.hours });
      }
      state.ptoDates = [...state.ptoDates, ...newDates];
    }
  },
  actions: {
    setState({ commit }, payload) {
      commit('setState', payload);
    },
    setSelectedPlan({ commit }, payload) {
      commit('setSelectedPlan', payload);
    },
    setHireDate({ commit, state }, payload) {      
      commit('setHireDate', payload);
      localStorage.setItem('state', JSON.stringify(state));
    },
    addPlan({ commit, state }, payload) {
      commit('removePlan', payload);
      commit('addPlan', payload);
      localStorage.setItem('state', JSON.stringify(state));
    },
    addPto({ commit }, payload) {
      commit('addPto', payload);

    }
  },
  getters: {
    selectedPlan: state => {
      return state.selectedPlan;
    },
    userInfo: state => {
      return { ...state.dateOfHire, ...state.isDeveloper, ...state.flexDayReferenceDate };
    },
    planNames: state => {
      return state.plans.map(plan => plan.name);
    },
    ptoDates: state => {
      return state.ptoDates
    },
    totalPtoHours: state => {
      return state.ptoDates.filter(ptoDate => ptoDate.planName === state.selectedPlan.name).reduce((acc, val) => { acc + val });
    }
  },
  modules: {
  }
})

