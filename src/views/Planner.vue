<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <div class="overline">View Type</div>
        <v-btn-toggle v-model="viewType" mandatory dense>
          <v-btn value="calendar"> Calendar </v-btn>
          <v-btn value="list"> List </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col class="d-flex justify-end">
        <div class="mr-5">
          <div class="overline">Entry Type</div>

          <v-btn-toggle v-model="entryType" mandatory dense>
            <v-btn value="single"> Single Day </v-btn>
            <v-btn value="multiple"> Multiple Days </v-btn>
          </v-btn-toggle>
        </div>
      </v-col>
      <v-col>
        <div v-if="entryType === 'multiple'">
          <div class="d-flex justify-start">
            <div class="mr-2 mt-3 mb-0" style="width: 110px">
              <DatePickerInMenu
                label="From"
                :selectedDate.sync="groupEntryStartDate"
                :showIcon="false"
              ></DatePickerInMenu>
            </div>

            <div class="mr-2 mt-3" style="width: 110px">
              <DatePickerInMenu
                label="To"
                :selectedDate.sync="groupEntryEndDate"
                :showIcon="false"
              ></DatePickerInMenu>
            </div>
          </div>
        </div>
        <div v-if="entryType === 'single'">
          <div class="d-flex justify-start">
            <div style="width: 110px" class="mt-3">
              <DatePickerInMenu
                label="Day"
                :selectedDate.sync="singleEntryDate"
                :showIcon="false"
              ></DatePickerInMenu>
            </div>
            <div class="mt-3 ml-2">
              <v-checkbox
                v-model="singleEntryIsAllDay"
                label="All Day"
              ></v-checkbox>
            </div>
            <div class="mt-3 ml-2 d-flex" v-if="!singleEntryIsAllDay">
              <v-text-field
                v-model="singleEntryHours"
                type="number"
                label="Hours"
                style="width: 60px"
              ></v-text-field>
              <v-select
                :items="meridianList"
                v-model="selectedMeridian"
                class="ml-2"
                label="During"
                style="width: 70px"
              ></v-select>
            </div>
          </div>
        </div>
        <div class="font-weight-light font-italic mt-7 d-inline">
          {{ totalHours }} total hours
        </div>
      </v-col>
      <v-col cols="2">
        <v-btn class="mt-5 d-inline" color="primary" @click="addPto"
          >Enter</v-btn
        >
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="9">
        <div v-show="viewType === 'calendar'">
          <PlannerCalendar
            :ptoDates="ptoDates"
            :holidays="holidays"
            :flexDays="flexDays"
            :payDays="payDays"
            @delete-pto="deletePto"
          ></PlannerCalendar>
        </div>
        <div v-show="viewType === 'list'"></div>
      </v-col>
      <v-col>
        <div class="mt-3">
          <WidgetHoursRemaining></WidgetHoursRemaining>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import WidgetHoursRemaining from "@/components/widgets/WidgetHoursRemaining";
import PlannerCalendar from "@/components/PtoPlanning/PlannerCalendar";
import DatePickerInMenu from "@/components/Inputs/DatePickerInMenu";
import { getIsoDateString } from "@/functions/dateHelpers";
import {
  getPtoDaysForRange,
  getPtoDayForSingle,
  getTotalPtoHours,
} from "@/functions/ptoHoursCalculator";
import { getFlexDays } from "@/functions/flexDayCalculator";
import { getPayDays } from "@/functions/payDayCalculator";
import moment from "moment";

export default {
  name: "Planner",
  components: {
    PlannerCalendar,
    DatePickerInMenu,
    WidgetHoursRemaining,
  },
  data: () => ({
    viewType: "calendar",
    entryType: "single",
    groupEntryStartDate: getIsoDateString(moment()),
    groupEntryEndDate: getIsoDateString(moment()),
    singleEntryDate: getIsoDateString(moment()),
    singleEntryIsAllDay: true,
    singleEntryHours: 0,
    meridianList: ["AM", "PM", "None"],
    selectedMeridian: "AM",
    holidays: [
      { description: "Christmas", date: "2020-12-25" },
      { description: "Christmas Eve", date: "2020-12-24" },
      { description: "New Year's Day", date: "2021-01-01" },
    ],
  }),
  computed: {
    totalHours: function () {
      return this.entryType === "single"
        ? getTotalPtoHours(
            getPtoDayForSingle(
              this.singleEntryDate,
              this.$store.getters.userInfo.isDeveloper,
              this.singleEntryIsAllDay,
              parseFloat(this.singleEntryHours)
            )
          )
        : getTotalPtoHours(
            getPtoDaysForRange(
              this.groupEntryStartDate,
              this.groupEntryEndDate,
              this.$store.getters.userInfo.isDeveloper
            )
          );
    },
    ptoDates: function () {
      return this.$store.getters.ptoDates;
    },
    flexDays() {
      return getFlexDays(this.$store.getters.userInfo.flexDayReferenceDate);
    },
    payDays() {
      return getPayDays(
        this.$store.state.plans.find(
          (plan) => plan.name === this.$store.getters.selectedPlan
        ).year
      );
    },
  },
  methods: {
    addPto() {
      let ptoDays = [];
      if (this.entryType === "single") {
        ptoDays = getPtoDayForSingle(
          this.singleEntryDate,
          this.$store.getters.userInfo.isDeveloper,
          this.singleEntryIsAllDay,
          parseFloat(this.singleEntryHours)
        );
      } else {
        ptoDays = getPtoDaysForRange(
          this.groupEntryStartDate,
          this.groupEntryEndDate,
          this.$store.getters.userInfo.isDeveloper
        );
      }

      this.$store.dispatch("addPtoDates", {
        planName: this.$store.getters.selectedPlan,
        pto: ptoDays,
      });
    },
    deletePto(date) {
      this.$store.dispatch("deletePtoDates", {
        planName: this.$store.getters.selectedPlan,
        date: date,
      });
    },
  },
};
</script>