<template>
  <v-app>
    <v-app-bar app color="primary" dark>
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
        ></v-select>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-tabs vertical :centered="false" v-if="plans.length > 0">
          <div class="overline grey--text">Plan PTO</div>
          <v-tab>
            <span class="float-left">
              <v-icon left> mdi-gauge </v-icon>
              Dashboard
            </span>
          </v-tab>

          <v-tab>
            <v-icon left> mdi-calendar-edit </v-icon>
            Calendar View
          </v-tab>
          <v-tab>
            <v-icon left> mdi-playlist-edit </v-icon>
            List View
          </v-tab>
          <div class="overline grey--text">Settings</div>
          <v-tab>
            <v-icon left> mdi-cog-outline </v-icon>
            Edit Plan
          </v-tab>
          <v-tab>
            <v-icon left> mdi-cog-transfer-outline </v-icon>
            Import/Export Plan
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-row>
                  <v-col cols="4">
                    <v-card>
                      <v-card-title class="headline"
                        >Planned hours</v-card-title
                      >
                      <v-card-text>
                        <v-progress-circular
                          :rotate="-90"
                          :size="100"
                          :width="15"
                          :value="percentagePlannedPto"
                          color="pink"
                        >
                          {{ totalPlannedPtoHours }}
                        </v-progress-circular>
                        <div class="outline">
                          {{ totalPlannedPtoHours }} of 158 hours PTO planned
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col> </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <PlannerParent></PlannerParent>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque
                  facilisis. Nam eget dui. Proin viverra, ligula sit amet
                  ultrices semper, ligula arcu tristique sapien, a accumsan nisi
                  mauris ac eros. In dui magna, posuere eget, vestibulum et,
                  tempor auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in justo pellentesque
                  facilisis. Proin sapien ipsum, porta a, auctor quis, euismod
                  ut, mi. Donec quam felis, ultricies nec, pellentesque eu,
                  pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>

        <InitializeWizard v-if="plans.length === 0"></InitializeWizard>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import InitializeWizard from "./components/InitializeWizard";
import PlannerParent from "@/components/PtoPlanning/PlannerParent";

export default {
  name: "App",

  components: {
    InitializeWizard,
    PlannerParent,
  },
  data: () => ({
    selectedPlan: "",
    hoursToUse: 150,
  }),
  computed: {
    plans: function () {
      return this.$store.getters.planNames;
    },
    totalPlannedPtoHours: function () {
      return this.$store.getters.plannedPtoTotal;
    },
    percentagePlannedPto: function () {
      return (parseFloat(this.totalPlannedPtoHours) / this.hoursToUse) * 100;
    },
  },
  watch: {
    plans(newPlans, oldPlans) {
      if (oldPlans.length === 0 && newPlans.length > 0) {
        this.selectedPlan = this.plans[0];
      }
    },
  },
  created: function () {
    const stateFromStorage = localStorage.getItem("state");

    if (stateFromStorage) {
      const state = JSON.parse(stateFromStorage);
      this.$store.dispatch("setState", state);
    }

    // if (this.plans.length > 0) {
    //   this.selectedPlan = this.plans[0];
    // }
  },
};
</script>
