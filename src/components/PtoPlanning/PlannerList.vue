<template>
  <div>
    <v-data-table
      :headers="tableHeaders"
      :items="aggregatedEventList"
      disable-sort
    >
      <template v-slot:item.date="{ item }">
        {{ item.date | formatDate }}
      </template>
      <template v-slot:item.type="{ item }">
        <div
          :class="[
            'text-uppercase',
            'caption',
            'font-weight-medium',
            `${getEventColor(item.type)}--text`,
          ]"
        >
          {{ getDescription(item.type) }}
        </div>
      </template>
      <template v-slot:item.hours="{ item }">
        <v-chip v-if="item.hours" :color="getEventColor(item.type)" dark label>
          {{ item.hours }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon v-if="item.type === 'usage'" @click="deletePto(item.date)"
          >mdi-close-circle-outline</v-icon
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { getAggregatedEventList } from "@/functions/eventAggregator";
import plannerMixin from "@/mixins/plannerMixin";

export default {
  name: "PlannerList",
  mixins: [plannerMixin],
  data: () => ({
    tableHeaders: [
      { text: "Date", value: "date" },
      { text: "Type", value: "type", width: "300" },
      { text: "Change", value: "hours", align: "end" },
      { text: "Balance", value: "runningTotal", align: "end" },
      { text: "", value: "actions", width: "200", align: "end" },
    ],
  }),
  computed: {
    aggregatedEventList() {
      return getAggregatedEventList(
        this.ptoDates,
        this.payDays,
        this.$store.getters.userInfo.dateOfHire,
        this.$store.getters.selectedPlan.year,
        this.$store.getters.selectedPlan.hoursBankedPrior,
        this.totalPtoAccrualHours,
        this.$store.getters.selectedPlan.hoursToRollover
      );
    },
  },
  methods: {
    getDescription(type) {
      if (type === "usage") {
        return "Hours Used";
      }
      if (type === "add") {
        return "Hours Added";
      }
      if (type === "beginning") {
        return "Beginning Balance";
      }
      if (type === "forfeited") {
        return "Forfeited Hours";
      }
      if (type === "beginning_next_year") {
        return "Next Year Start bal";
      }

      return type;
    },
    getEventColor(type) {
      if (type === "usage") {
        return "purple";
      }
      if (type === "add") {
        return "green";
      }
      if (type === "forfeited") {
        return "pink";
      }

      return "grey";
    },
    deletePto(date) {
      this.$emit("delete-pto", date);
    },
  },
};
</script>