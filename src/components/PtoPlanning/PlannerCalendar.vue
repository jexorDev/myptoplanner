<template>
  <div>
    <v-row class="fill-height" no-gutters>
      <v-col>
        <v-sheet>
          <v-toolbar flat>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>

            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
          </v-toolbar>
        </v-sheet>
        <v-sheet :height="600">
          <v-calendar
            ref="calendar"
            type="month"
            v-model="focus"
            :events="events"
            :event-color="getEventColor"
            @click:event="showEvent"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="deletePto(selectedEvent.start)">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { getIsoDateString } from "@/functions/dateHelpers";
import moment from "moment";

export default {
  name: "PlannerCalendar",
  data: () => ({
    focus: getIsoDateString(moment()),
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
  }),
  props: {
    planYear: Number,
    ptoDates: Array,
    holidays: Array,
    flexDays: Array,
    payDays: Array,
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  computed: {
    events: function () {
      return [
        ...this.ptoDates.map((ptoDate) => ({
          name: `Usage: ${ptoDate.hours} hrs`,
          start: ptoDate.date,
          color: "green",
          timed: false,
          type: "pto",
        })),
        ...this.holidays.map((holiday) => ({
          name: holiday.description,
          start: holiday.date,
          color: "red",
          timed: false,
          type: "holiday",
        })),
      ];
    },
  },
  methods: {
    deletePto(date) {
      this.$emit("delete-pto", date);
      this.selectedOpen = false;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    getEventColor(event) {
      return event.color;
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        if (event.type !== "pto") return;

        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
};
</script>