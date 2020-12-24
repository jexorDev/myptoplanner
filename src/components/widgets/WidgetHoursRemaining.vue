<template>
  <div>
    <div class="d-flex justify-center">
      <v-progress-circular
        :rotate="-90"
        :size="100"
        :width="15"
        :value="plannedPtoPercent"
        color="pink"
      >
        {{ totalPtoPlanned }}
      </v-progress-circular>
    </div>

    <div class="d-flex justify-center font-weight-medium">
      {{ totalPtoPlanned }} of {{ totalHoursToPlan }} planned
    </div>
    <div class="d-flex justify-center">
      {{ remainingPtoToPlan }} hours remaining to plan
    </div>
  </div>
</template>
<script>
import { getPtoBreakdown } from "@/functions/employeeInfoCalculator";

export default {
  name: "WidgetHoursRemaining",
  data: () => ({
    totalHoursToPlan: 0,
  }),
  mounted: function () {
    const plan = this.$store.state.plans.find(
      (plan) => plan.name === this.$store.getters.selectedPlan
    );

    if (!plan) return;

    this.totalHoursToPlan = getPtoBreakdown(
      this.$store.getters.userInfo.dateOfHire,
      plan.year
    ).totalHours;
  },
  computed: {
    totalPtoPlanned: function () {
      return this.$store.getters.ptoDates
        .filter((ptoDate) => ptoDate.plan === this.$store.getters.selectedPlan)
        .map((ptoDate) => ptoDate.hours)
        .reduce((acc, val) => {
          return acc + val;
        }, 0);
    },
    remainingPtoToPlan: function () {
      return this.totalHoursToPlan - this.totalPtoPlanned;
    },
    plannedPtoPercent: function () {
      return this.totalHoursToPlan > 0
        ? (this.totalPtoPlanned / this.totalHoursToPlan) * 100
        : 0;
    },
  },
};
</script>