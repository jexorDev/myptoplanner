<template>
  <div>
    <v-row class="mt-5">
      <v-col cols="5">
        <div class="headline font-weight-light mt-5">
          Forecast and plan your Paid Time Off
        </div>
        <div class="font-weight-regular">
          With this simple to use tool, forecasting and planning your paid time
          off has never been easier.
        </div>

        <div class="mt-5">
          <v-icon x-large class="d-inline">mdi-timer-sand</v-icon>
          <div class="d-inline overline">
            Know how much PTO you will accrue for the year
          </div>
        </div>
        <div class="mt-1">
          <v-icon x-large class="d-inline">mdi-update</v-icon>
          <div class="d-inline overline">
            Set and maintain a buffer for hours to rollover
          </div>
        </div>
        <div class="mt-1">
          <v-icon x-large class="d-inline">mdi-finance</v-icon>
          <div class="d-inline overline">
            See how your balance changes over time
          </div>
        </div>
        <div class="mt-1">
          <v-icon x-large class="d-inline">mdi-monitor-dashboard</v-icon>
          <div class="d-inline overline">
            Informative dashboard for a high level view
          </div>
        </div>
        <div class="mt-1">
          <v-icon x-large class="d-inline">mdi-map-check-outline</v-icon>
          <div class="d-inline overline">Easy to use views for planning</div>
        </div>

        <v-btn x-large outlined color="primary" class="mt-7" to="/add-plan"
          >Get Started</v-btn
        >
      </v-col>
      <v-col cols="7">
        <v-img src="/assets/landing-info-planner.PNG"></v-img>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Start",
};
</script>