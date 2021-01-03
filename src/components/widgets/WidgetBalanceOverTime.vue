<template>
  <v-sparkline
    :value="balanceByMonth"
    :labels="labels"
    auto-draw
    :fill="true"
    height="100"
  ></v-sparkline>
</template>
<script>
import { getBalanceOverTime } from "@/functions/balanceOverTimeCalculator";
import { getPayDays } from "@/functions/payDayCalculator";

export default {
  name: "WidgetBalanceOverTime",
  data: () => ({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
  }),
  computed: {
    balanceByMonth() {
      return getBalanceOverTime(
        this.$store.getters.ptoDates,
        getPayDays(this.$store.getters.selectedPlan.year),
        this.$store.getters.userInfo.dateOfHire,
        this.$store.getters.selectedPlan.year,
        this.$store.getters.selectedPlan.hoursBankedPrior
      );
    },
  },
};
</script>