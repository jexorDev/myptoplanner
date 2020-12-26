<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left>
      <div class="d-flex align-center headline">My PTO Planner</div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center mt-2">
        <v-select
          v-if="plans.length > 0"
          :items="plans"
          v-model="selectedPlan"
          outlined
          dense
          class="mt-2"
        >
          <template v-slot:append-item>
            <v-btn color="primary" text>Add Plan</v-btn>
          </template>
        </v-select>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      app
      clipped
      expand-on-hover
      permanent
      v-show="plans.length > 0"
    >
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-gauge</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/planner">
          <v-list-item-icon>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Planner</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/settings">
          <v-list-item-icon>
            <v-icon>mdi-cog-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="ml-3">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({}),
  computed: {
    plans() {
      return this.$store.state.plans.map((plan) => plan.name);
    },
    selectedPlan: {
      get() {
        return this.$store.getters.selectedPlan;
      },
      set(value) {
        this.$store.dispatch("setSelectedPlan", value);
      },
    },
  },
  created: function () {
    const stateFromStorage = localStorage.getItem("state");

    if (stateFromStorage) {
      const state = JSON.parse(stateFromStorage);
      this.$store.dispatch("setState", state);
    }

    if (this.$store.state.plans.length === 0) {
      if (this.$route.name !== "Start") {
        this.$router.push({ path: "/start" });
      }
    } else {
      this.selectedPlan = this.$store.state.plans[0].name;
      this.$store.dispatch("setSelectedPlan", this.selectedPlan);
    }
  },
};
</script>
