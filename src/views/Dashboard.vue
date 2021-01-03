<template>
  <v-row>
    <v-col cols="3">
      <v-card class="dashboard-card">
        <v-card-title class="headline d-flex justify-center"
          >Planned hours</v-card-title
        >
        <v-card-text>
          <WidgetHoursRemaining></WidgetHoursRemaining>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card class="dashboard-card">
        <v-card-title class="headline d-flex justify-center"
          >Rollover hours</v-card-title
        >
        <v-card-text>
          <WidgetRolloverHoursRemaining></WidgetRolloverHoursRemaining>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card class="dashboard-card">
        <v-card-title class="headline d-flex justify-center"
          >Ending Balance</v-card-title
        >
        <v-card-text>
          <WidgetNextYearBanked></WidgetNextYearBanked>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import WidgetHoursRemaining from "@/components/widgets/WidgetHoursRemaining";
import WidgetRolloverHoursRemaining from "@/components/widgets/WidgetRolloverHoursRemaining";
import WidgetNextYearBanked from "@/components/widgets/WidgetNextYearBanked";

export default {
  name: "Dashboard",
  components: {
    WidgetHoursRemaining,
    WidgetRolloverHoursRemaining,
    WidgetNextYearBanked,
  },
};
</script>
<style>
.dashboard-card {
  height: 100%;
}
</style>