<template>
  <div>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1"> Welcome </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">
          Service Information
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3">
          Plan Creation
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 4" step="4"> Review </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-row>
            <v-col>
              <div class="display-2">Welcome!</div>
              <div>
                This tool will help you plan out your PTO. Since this is your
                first visit, we will need some information to calculate your PTO
                before you can make a plan.
              </div>
            </v-col>
          </v-row>
          <v-row class="mt-4">
            <v-col class="d-flex justify-space-between">
              <v-btn color="primary" @click="step--">
                <v-icon>mdi-chevron-left</v-icon>Previous</v-btn
              >
              <v-btn color="primary" @click="step++"
                >Next<v-icon>mdi-chevron-right</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="2">
          <SetupService
            :dateOfHire.sync="dateOfHire"
            :isDeveloper.sync="isDeveloper"
            :flexDayReferenceDate.sync="flexDayReferenceDate"
          ></SetupService>
          <v-row class="mt-4">
            <v-col class="d-flex justify-space-between">
              <v-btn color="primary" @click="step--">
                <v-icon>mdi-chevron-left</v-icon>Previous</v-btn
              >
              <v-btn color="primary" @click="moveToCreatePlanStep"
                >Next<v-icon>mdi-chevron-right</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="3">
          <SetupPlan
            :selectedPlanYear.sync="selectedPlanYear"
            :planName.sync="planName"
            :hoursToRollover.sync="hoursToRollover"
            :bankedHoursFromPriorYear.sync="bankedHoursFromPriorYear"
            :dateOfHire="dateOfHire"
          ></SetupPlan>
          <v-row class="mt-4">
            <v-col class="d-flex justify-space-between">
              <v-btn color="primary" @click="step--">
                <v-icon>mdi-chevron-left</v-icon>Previous</v-btn
              >
              <v-btn color="primary" @click="moveToReviewStep"
                >Next<v-icon>mdi-chevron-right</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="4">
          <v-row>
            <v-col>
              <div class="display-1">{{ planName }}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <SetupSummary
                :planYear="selectedPlanYear"
                :bankedHoursFromPriorYear="bankedHoursFromPriorYear"
                :hoursWillAccrueForPlanYear="hoursWillAccrueForPlanYear"
                :hoursToRollover="hoursToRollover"
              ></SetupSummary>
            </v-col>
            <v-col>
              <div>PTO Rate Effective Dates</div>

              <v-simple-table v-if="ptoBreakdown">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Start</th>
                      <th>End</th>
                      <th>Hours Per Pay</th>
                      <th>Total Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(ptoRow, index) in ptoBreakdown.breakdown"
                      :key="index"
                    >
                      <td>{{ ptoRow.dateStart.format("MM/DD/YYYY") }}</td>
                      <td>{{ ptoRow.dateEnd.format("MM/DD/YYYY") }}</td>
                      <td>{{ ptoRow.ptoHoursPerPay }}</td>
                      <td>{{ ptoRow.totalPtoHours }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-row class="mt-4">
            <v-col class="d-flex justify-space-between">
              <v-btn color="primary" @click="step--">
                <v-icon>mdi-chevron-left</v-icon>Previous</v-btn
              >
              <v-btn color="success" outlined @click="savePlan"
                ><v-icon class="mr-1">mdi-check-circle-outline</v-icon>Save and
                begin planning PTO</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import SetupPlan from "@/components/setup/SetupPlan";
import SetupSummary from "@/components/setup/SetupSummary";
import SetupService from "@/components/setup/SetupService";
import {
  getPtoBreakdown,
  getRolloverMax,
} from "@/functions/employeeInfoCalculator";
import { getIsoDateString } from "@/functions/dateHelpers";
import moment from "moment";

export default {
  name: "InitializeWizard",
  components: {
    SetupPlan,
    SetupSummary,
    SetupService,
  },
  data: () => ({
    step: 1,
    dateOfHire: moment({ month: 3, day: 18, year: 2015 })
      .toISOString()
      .substring(0, 10),
    isDeveloper: false,
    flexDayReferenceDate: getIsoDateString(moment()),
    ptoBreakdown: null,
    planName: "",
    selectedPlanYear: "",
    hoursToRollover: 0,
    maxRolloverHours: 0,
    bankedHoursFromPriorYear: 0,
  }),
  computed: {
    hoursWillAccrueForPlanYear() {
      return this.ptoBreakdown === null ? 0 : this.ptoBreakdown.totalHours;
    },
  },
  methods: {
    moveToCreatePlanStep() {
      this.maxRolloverHours = getRolloverMax(
        this.dateOfHire,
        this.selectedPlanYear
      );
      this.step++;
    },
    moveToReviewStep() {
      this.ptoBreakdown = getPtoBreakdown(
        this.dateOfHire,
        this.selectedPlanYear
      );
      this.step++;
    },
    savePlan() {
      this.$store.dispatch("setUserInfo", {
        dateOfHire: this.dateOfHire,
        isDeveloper: this.isDeveloper,
        flexDayReferenceDate: this.flexDayReferenceDate,
      });
      this.$store.dispatch("addPlan", {
        name: this.planName,
        created: moment(),
        year: this.selectedPlanYear,
        hoursToRollover: this.hoursToRollover,
        hoursBankedPrior: this.bankedHoursFromPriorYear,
      });
      this.$store.dispatch("setSelectedPlan", this.planName);
      this.$router.push({ path: "/" });
    },
  },
};
</script>
