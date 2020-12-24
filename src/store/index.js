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
      state.selectedPlan = payload.plans ? payload.plans[0] : "";
      state.dateOfHire = payload.dateOfHire;
      state.isDeveloper = payload.isDeveloper;
      state.flexDayReferenceDate = payload.flexDayReferenceDate;
      state.plans = [...payload.plans];
      state.ptoDates = [...payload.ptoDates];
    },
    setSelectedPlan(state, payload) {
      state.selectedPlan = payload;
    },
    setUserInfo(state, payload) {
      state.dateOfHire = payload.dateOfHire;
      state.isDeveloper = payload.isDeveloper;
      state.flexDayReferenceDate = payload.flexDayReferenceDate;
    },
    setPlans(state, payload) {
      state.plans = [...payload];
    },
    setPtoDates(state, payload) {
      state.ptoDates = payload
    }
  },
  actions: {
    setState({ commit }, payload) {
      commit('setState', payload);
    },
    setSelectedPlan({ commit }, payload) {
      commit('setSelectedPlan', payload);
    },
    setUserInfo({ commit, state }, payload) {      
      commit('setUserInfo', payload);
      localStorage.setItem('state', JSON.stringify(state));
    },
    addPlan({ commit, state }, payload) {
      commit('setPlans', [...state.plans, payload]);
      localStorage.setItem('state', JSON.stringify(state));
    },
    updatePlan({ commit, state }, payload) {
      const existingPlans = state.plans.filter(plan => plan.name !== payload.originalName);
      commit('setPlans', [...existingPlans, payload.updatedPlan]);
      localStorage.setItem('state', JSON.stringify(state));
    },
    deletePlan({ commit, state }, payload) {
      commit('setPlans', [state.plans.filter(plan => plan.name !== payload)]);  
      localStorage.setItem('state', JSON.stringify(state));
    },
    addPtoDates({ commit, state }, payload) {
      const newDates = [];      
      for (let pto of payload.pto) {
        newDates.push({ plan: payload.planName, date: pto.date, hours: pto.hours });
      }
      const newPtoDates = [...state.ptoDates.filter(ptoDate => !newDates.find(newDate => newDate.plan === ptoDate.plan && newDate.date === ptoDate.date)), ...newDates];
    
      commit('setPtoDates', newPtoDates);
      localStorage.setItem('state', JSON.stringify(state));

    },
    deletePtoDates({ commit, state }, payload) {
      commit('setPtoDates', [...state.ptoDates.filter(ptoDate => ptoDate.planName !== payload.planName && ptoDate.date !== payload.date)] )
      localStorage.setItem('state', JSON.stringify(state));

    },
    deleteAccount({ commit }) {
      commit('setState', {});
      localStorage.removeItem('state');
      
    }
  },
  getters: {
    selectedPlan: state => {
      return state.selectedPlan;
    },
    userInfo: state => {
      return { dateOfHire: state.dateOfHire, isDeveloper: state.isDeveloper, flexDayReferenceDate: state.flexDayReferenceDate };
    },
    planNames: state => {
      return state.plans.map(plan => plan.name);
    },
    ptoDates: state => {
      return state.ptoDates ?? []
    },
  },
  modules: {
  }
})

