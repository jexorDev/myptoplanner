<template>
  <div>
    <div class="display-4 d-flex justify-center">
      {{ endingBalance }}
    </div>
    <div class="d-flex justify-center">hours</div>
  </div>
</template>
<script>
import plannerMixin from "@/mixins/plannerMixin";
import { getAggregatedEventList } from "@/functions/eventAggregator";

export default {
  name: "WidgetNextYearBanked",
  mixins: [plannerMixin],
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
    endingBalance() {
      return this.aggregatedEventList.length > 0
        ? this.aggregatedEventList[this.aggregatedEventList.length - 1]
            .runningTotal
        : 0;
    },
  },
};
</script>