<template>
  <div>
    <v-row class="fill-height">
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
        <v-sheet>
          <v-calendar ref="calendar" type="month" v-model="focus"></v-calendar>
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
  }),
  props: {
    planYear: Number,
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  computed: {},
  methods: {
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
  },
};
</script>