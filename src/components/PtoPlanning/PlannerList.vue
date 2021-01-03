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
        <v-chip :color="getEventColor(item.type)" dark>
          {{ item.type }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon v-if="item.type === 'usage'" @click="deletePto(item.date)"
          >mdi-trash-can-outline</v-icon
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
      { text: "Type", value: "type" },
      { text: "Change", value: "hours" },
      { text: "Balance", value: "runningTotal" },
      { text: "", value: "actions" },
    ],
  }),
  computed: {
    aggregatedEventList() {
      return getAggregatedEventList(
        this.ptoDates,
        [],
        [],
        this.payDays,
        this.$store.getters.userInfo.dateOfHire,
        this.$store.getters.selectedPlan.year,
        this.$store.getters.selectedPlan.hoursBankedPrior
      );
    },
  },
  methods: {
    getDescription(type) {
      if (type === "usage") {
        return "Usage";
      }
      if (type === "add") {
        return "Add";
      }
    },
    getEventColor(type) {
      if (type === "usage") {
        return "purple";
      }
      if (type === "add") {
        return "green";
      }

      return "grey";
    },
    deletePto(date) {
      this.$emit("delete-pto", date);
    },
  },
};
</script>