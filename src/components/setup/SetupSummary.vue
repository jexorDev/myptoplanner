<template>
  <div>
    <v-timeline dense>
      <v-timeline-item right small>
        You entered {{ planYear }} with a Banked PTO balance of
        <span class="primary--text">{{ bankedHoursFromPriorYear }}</span>
        hours</v-timeline-item
      >
      <v-timeline-item right small>
        You will accrue
        <span class="primary--text">{{ hoursWillAccrueForPlanYear }}</span>
        hours this year</v-timeline-item
      >
      <v-timeline-item right small>
        You are rolling over
        <span class="primary--text">{{ hoursToRollover }}</span>
        hours to {{ planYearNumeric + 1 }}
      </v-timeline-item>
      <v-timeline-item right small>
        You need to use
        <span class="primary--text">{{ hoursNeedToUse }}</span>
        hours prior to January 1, {{ planYearNumeric + 1 }}</v-timeline-item
      >
      <v-timeline-item right small v-if="hoursToRollover > 0">
        Your starting Banked PTO balance in {{ planYearNumeric + 1 }} will be
        <span class="primary--text">{{ nextYearBankedPto }}</span>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>
<script>
export default {
  name: "SetupSummary",
  props: {
    planYear: {
      type: String,
      required: true,
    },
    bankedHoursFromPriorYear: {
      type: Number,
      required: false,
      default: 0,
    },
    hoursWillAccrueForPlanYear: {
      type: Number,
      required: true,
    },
    hoursToRollover: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  computed: {
    hoursNeedToUse() {
      return this.hoursWillAccrueForPlanYear - this.hoursToRollover;
    },
    nextYearBankedPto() {
      return this.bankedHoursFromPriorYear + this.hoursToRollover;
    },
    planYearNumeric() {
      return parseInt(this.planYear);
    },
  },
};
</script>