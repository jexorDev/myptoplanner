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
          <v-row>
            <v-col cols="4">
              Date of hire
              <div class="font-weight-light">
                This is used to calculate how many hours of PTO you will receive
              </div>
            </v-col>
            <v-col>
              <v-menu
                ref="hireDateMenu"
                v-model="showHireDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="hireDateFormatted"
                    label="Date of Hire"
                    hint="MM/DD/YYYY"
                    prepend-icon="mdi-calendar"
                    style="width: 200px"
                    v-bind="attrs"
                    @blur="hireDate = parseDate(hireDateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="hireDate"
                  no-title
                  @input="showHireDateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col></v-col>
          </v-row>

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
          <v-row>
            <v-col cols="4">
              <div>What year are you planning your PTO for?</div>
            </v-col>
            <v-col cols="1">
              <v-select
                :items="planYears"
                v-model="planYear"
                label="Plan Year"
              ></v-select>
            </v-col>
            <v-col></v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <div>How many hours did you enter {{ planYear }} with?</div>
              <div class="font-weight-light">
                This can be found on any of your {{ planYear }} pay stubs as
                "Banked PTO Hrs"
              </div>
            </v-col>
            <v-col cols="1">
              <v-text-field
                v-model="bankedPto"
                type="number"
                label="Banked PTO"
              ></v-text-field>
            </v-col>
            <v-col></v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <div>
                How many hours would you like to rollover to {{ planYear + 1 }}?
              </div>
              <div class="font-weight-light mb-2">
                {{ maxRolloverHoursSliderInfo }}
              </div>
            </v-col>
            <v-col cols="5">
              <v-slider
                v-model="rolloverHours"
                :max="maxRolloverHours"
                :min="0"
                :thumb-label="true"
                :step="0.25"
                inverse-label
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="rolloverHours"
                    class="mt-0 pt-0"
                    type="number"
                    style="width: 60px"
                    readonly
                  ></v-text-field>
                </template>
              </v-slider>
            </v-col>
            <v-col></v-col>
          </v-row>

          <v-row>
            <v-col cols="4">
              <div>
                Give your plan a name
                <div class="font-weight-light">
                  You may have multiple plans for the same year. This helps to
                  distinguish those.
                </div>
              </div>
            </v-col>
            <v-col>
              <v-text-field
                v-model="planName"
                label="Plan Name"
                hide-details="auto"
                :prefix="`${planYear} - `"
                :placeholder="`ex: My ${planYear} plan with trips to Gulf Shores and Orlando!`"
              ></v-text-field>
            </v-col>
          </v-row>

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
          <v-row v-if="ptoBreakdown">
            <v-col>
              <v-timeline dense v-if="ptoBreakdown">
                <v-timeline-item right small>
                  You entered {{ planYear }} with a Banked PTO balance of
                  <span class="primary--text">{{ bankedPto }}</span>
                  hours</v-timeline-item
                >
                <v-timeline-item right small>
                  You will accrue
                  <span class="primary--text">{{
                    ptoBreakdown.totalHours
                  }}</span>
                  hours this year</v-timeline-item
                >
                <v-timeline-item right small>
                  You are rolling over
                  <span class="primary--text">{{ rolloverHours }}</span>
                  hours to {{ planYear + 1 }}
                </v-timeline-item>
                <v-timeline-item right small>
                  You need to use
                  <span class="primary--text">{{ hoursToUse }}</span>
                  hours prior to January 1, {{ planYear + 1 }}</v-timeline-item
                >
                <v-timeline-item right small v-if="rolloverHours > 0">
                  Your starting Banked PTO balance in {{ planYear + 1 }} will be
                  <span class="primary--text">{{ nextYearBankedPto }}</span>
                </v-timeline-item>
              </v-timeline>
            </v-col>
            <v-col>
              <div>PTO Rate Effective Dates</div>

              <v-simple-table v-if="ptoBreakdown.breakdown.length > 0">
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
              <v-btn color="primary" outlined @click="savePlan"
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
import { getPtoBreakdown, getRolloverMax } from "@/functions/ptoCalculator";
import moment from "moment";

export default {
  name: "InitializeWizard",

  data: (vm) => ({
    step: 1,
    hireDate: moment({ month: 3, day: 18, year: 2015 })
      .toISOString()
      .substring(0, 10),
    hireDateFormatted: vm.formatDate(
      moment({ month: 3, day: 18, year: 2015 }).toISOString().substring(0, 10)
    ),
    showHireDateMenu: false,
    ptoBreakdown: null,
    planName: "",
    planYear: moment().year(),
    planYears: [moment().year(), moment().year() + 1],
    rolloverHours: 0,
    maxRolloverHours: 0,
    bankedPto: 0,
  }),
  computed: {
    hoursToUse: function () {
      return this.ptoBreakdown
        ? this.ptoBreakdown.totalHours - this.rolloverHours
        : 0;
    },
    maxRolloverHoursSliderInfo: function () {
      return `With your years of service, you may roll over a maxiumum of ${this.maxRolloverHours} hours`;
    },
    nextYearBankedPto: function () {
      return parseFloat(this.bankedPto) + parseFloat(this.rolloverHours);
    },
  },
  watch: {
    hireDate() {
      this.hireDateFormatted = this.formatDate(this.hireDate);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    moveToCreatePlanStep() {
      this.maxRolloverHours = getRolloverMax(this.hireDate, this.planYear);
      this.step++;
    },
    moveToReviewStep() {
      this.ptoBreakdown = getPtoBreakdown(this.hireDate, this.planYear);
      this.step++;
    },
    savePlan() {
      const userData = {
        dateOfHire: this.hireDate,
        plans: [
          {
            name: `${this.planYear} - ${this.planName}`,
            created: moment(),
            year: this.planYear,
            hoursToRollover: this.rolloverHours,
            hoursBankedPrior: this.bankedPto,
          },
        ],
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    },
  },
};
</script>
