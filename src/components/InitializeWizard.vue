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
          <h1>Welcome!</h1>
          <div>
            This tool will help you plan out your PTO. Since this is your first
            visit, we will need some information to calculate your PTO before
            you can make a plan.
          </div>
          <v-btn color="primary" @click="step = 2"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div>
            To calculate how many hours of PTO youw will recieve this year,
            please enter your date of hire:
          </div>
          <v-row>
            <v-col :cols="3">
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
            <v-col :cols="9"> </v-col>
          </v-row>

          <v-btn color="primary" @click="moveToCreatePlanStep">
            Continue
          </v-btn>

          <v-btn text @click="step = 1"> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-row>
            <v-col>
              What year are you planning your PTO for?
              <v-select :items="planYears" v-model="planYear"></v-select>
            </v-col>
            <v-col>
              How many hours did you enter {{ planYear }} with?
              <v-icon>mdi-information-outline</v-icon>
              <v-text-field></v-text-field>
            </v-col>
            <v-col>
              How many hours would you like to rollover to {{ planYear + 1 }}?
              <v-slider
                v-model="rolloverHours"
                :max="maxRolloverHours"
                :min="0"
                :thumb-label="true"
                :hint="maxRolloverHoursSliderHint"
              ></v-slider>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div>
                Give your plan a name (you can have multiple plans for the same
                year)
                <v-text-field
                  v-model="planName"
                  label="Plan Name"
                  hide-details="auto"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>

          <v-btn color="primary" @click="moveToReviewStep"> Continue </v-btn>

          <v-btn text @click="step = 2"> Cancel </v-btn>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-row v-if="ptoBreakdown">
            <v-col>
              <v-timeline dense v-if="ptoBreakdown">
                <v-timeline-item right small>
                  You will accrue
                  <span class="primary--text">{{
                    ptoBreakdown.totalHours
                  }}</span>
                  this year</v-timeline-item
                >
                <v-timeline-item right small>
                  You are rolling over
                  <span class="primary--text">{{ rolloverHours }}</span>
                  hours to {{ planYear + 1 }}
                </v-timeline-item>
                <v-timeline-item right small>
                  You need to use
                  <span class="primary--text">{{ hoursToUse }}</span>
                  hours prior to 12/31/{{ planYear }}</v-timeline-item
                >
              </v-timeline>
            </v-col>
            <v-col>
              <h3>PTO Rate Effective Dates</h3>
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

            <v-btn text @click="step--"> Cancel </v-btn>
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
  }),
  computed: {
    hoursToUse: function () {
      return this.ptoBreakdown
        ? this.ptoBreakdown.totalHours - this.rolloverHours
        : 0;
    },
    maxRolloverHoursSliderHint: function () {
      return `With your years of service, you may roll over a maxiumum of ${this.maxRolloverHours} hours`;
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
  },
};
</script>
