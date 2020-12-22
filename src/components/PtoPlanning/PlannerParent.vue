<template>
  <div>
    <v-row>
      <v-col>
        <v-toolbar dense>
          <v-btn-toggle
            v-model="viewType"
            color="primary"
            mandatory
            dense
            group
          >
            <v-btn value="calendar" text>
              <v-icon>mdi-calendar-month</v-icon>
            </v-btn>
            <v-btn value="list" text>
              <v-icon>mdi-playlist-star</v-icon>
            </v-btn>
          </v-btn-toggle>
          <v-spacer></v-spacer>
          <v-btn-toggle
            v-model="entryType"
            color="primary"
            mandatory
            dense
            group
          >
            <v-btn value="day" text>
              <v-icon>mdi-calendar-today</v-icon>
            </v-btn>
            <v-btn value="block" text>
              <v-icon>mdi-calendar-range</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <PlannerCalendar></PlannerCalendar>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import PlannerCalendar from "@/components/PtoPlanning/PlannerCalendar";

export default {
  name: "PlannerParent",
  components: {
    PlannerCalendar,
  },
  data: () => ({
    viewType: "calendar",
    entryType: "day",
  }),
};
</script>