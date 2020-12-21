<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center font-weight-medium">PTO Planner</div>

      <v-spacer></v-spacer>

      <v-select v-if="plans" :items="plans" v-model="selectedPlan"></v-select>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <InitializeWizard></InitializeWizard>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import InitializeWizard from "./components/InitializeWizard";

export default {
  name: "App",

  components: {
    InitializeWizard,
  },
  data: () => ({
    plans: [],
    selectedPlan: "",
  }),
  created: function () {
    const userDataFromStorage = localStorage.getItem("userData");

    if (userDataFromStorage) {
      const userData = JSON.parse(userDataFromStorage);

      this.plans = userData.plans.map((plan) => plan.name);
      this.selectedPlan = this.plans[0];
    }
  },
};
</script>
