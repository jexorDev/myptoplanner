<template>
  <div>
    <v-row>
      <v-col>
        <div class="overline">View Type</div>
        <v-btn-toggle v-model="viewType" mandatory dense>
          <v-btn value="calendar"> Calendar </v-btn>
          <v-btn value="list"> List </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col class="d-flex justify-end">
        <div>
          <div class="overline">Entry Type</div>

          <v-btn-toggle v-model="entryType" mandatory dense>
            <v-btn value="day"> Single Day </v-btn>
            <v-btn value="block"> Multiple Days </v-btn>
          </v-btn-toggle>
        </div>
      </v-col>
      <v-col>
        <div v-if="entryType === 'block'">
          <div class="d-flex justify-start">
            <div class="mr-2 mt-3">
              <DatePickerInMenu
                label="From"
                :selectedDate.sync="groupEntryStartDate"
                :showIcon="false"
              ></DatePickerInMenu>
            </div>

            <div class="mr-2 mt-3">
              <DatePickerInMenu
                label="To"
                :selectedDate.sync="groupEntryEndDate"
                :showIcon="false"
              ></DatePickerInMenu>
            </div>
          </div>
          <div class="font-weight-light font-italic">18 total hours</div>
        </div>
      </v-col>
      <v-col>
        <v-btn class="mt-6" color="primary">Enter</v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="9">
        <PlannerCalendar></PlannerCalendar>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </div>
</template>
<script>
import PlannerCalendar from "@/components/PtoPlanning/PlannerCalendar";
import DatePickerInMenu from "@/components/Inputs/DatePickerInMenu";
import { getIsoDateString } from "@/functions/dateHelpers";
import moment from "moment";

export default {
  name: "PlannerParent",
  components: {
    PlannerCalendar,
    DatePickerInMenu,
  },
  data: () => ({
    viewType: "calendar",
    entryType: "day",
    groupEntryStartDate: getIsoDateString(moment()),
    groupEntryEndDate: getIsoDateString(moment()),
  }),
};
</script>