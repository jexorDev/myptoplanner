<template>
  <v-row>
    <v-col cols="3">
      <v-card>
        <v-card-title class="headline d-flex justify-center"
          >Planned hours</v-card-title
        >
        <v-card-text>
          <WidgetHoursRemaining></WidgetHoursRemaining>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import WidgetHoursRemaining from "@/components/widgets/WidgetHoursRemaining";

export default {
  name: "Dashboard",
  components: {
    WidgetHoursRemaining,
  },
};
</script>