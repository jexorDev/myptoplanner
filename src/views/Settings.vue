<template>
  <div class="mx-auto">
    <div class="display-1 headline">User Information</div>
    <SetupService
      :dateOfHire.sync="dateOfHire"
      :isDeveloper.sync="isDeveloper"
      :flexDayReferenceDate.sync="flexDayReferenceDate"
    ></SetupService>
    <v-row>
      <v-btn color="red" text @click="deleteAccount">Delete Account</v-btn>
    </v-row>
    <div class="mt-3">
      <v-btn
        color="primary"
        @click="saveServiceInfoChanges"
        :disabled="serviceButtonsDisabled"
        >Save</v-btn
      >
      <v-btn
        text
        @click="cancelServiceInfoChanges"
        :disabled="serviceButtonsDisabled"
        >Cancel</v-btn
      >
    </div>
    <v-divider class="mt-3 mb-3"></v-divider>
    <div class="display-1 headline">Plan Information</div>
    <SetupPlan
      :selectedPlanYear="planYear"
      :planName.sync="planName"
      :hoursToRollover.sync="hoursToRollover"
      :bankedHoursFromPriorYear.sync="bankedHoursFromPriorYear"
      :dateOfHire="dateOfHire"
      :isPlanYearDisabled="true"
    ></SetupPlan>
    <v-row>
      <v-btn color="red" text @click="deletePlan">Delete Plan</v-btn>
    </v-row>
    <div class="mt-3">
      <v-btn
        color="primary"
        @click="savePlanInfoChanges"
        :disabled="planButtonsDisabled"
        >Save</v-btn
      >
      <v-btn text @click="cancelPlanInfoChanges" :disabled="planButtonsDisabled"
        >Cancel</v-btn
      >
    </div>
    <v-divider class="mt-3 mb-3"></v-divider>

    <v-dialog v-model="showUnsavedChangesDialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline"> You have unsaved changes </v-card-title>
        <v-card-text
          >Please save or cancel the changes before leaving this
          page</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showUnsavedChangesDialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import SetupService from "@/components/setup/SetupService";
import SetupPlan from "@/components/setup/SetupPlan";

export default {
  name: "Settings",

  components: {
    SetupService,
    SetupPlan,
  },
  data: () => ({
    showUnsavedChangesDialog: false,
    dateOfHire: "",
    oldDateOfHire: "",
    isDeveloper: false,
    oldIsDeveloper: false,
    flexDayReferenceDate: "",
    oldFlexDayReferenceDate: "",
    hoursToRollover: 0,
    oldHoursToRollover: 0,
    bankedHoursFromPriorYear: 0,
    oldBankedHoursFromPriorYear: 0,
    planName: "",
    oldPlanName: "",
    planYear: "",
    planCreated: "",
  }),
  mounted() {
    this.intiializeFields();
  },
  methods: {
    intiializeFields() {
      //service info
      this.dateOfHire = this.$store.getters.userInfo.dateOfHire;
      this.oldDateOfHire = this.dateOfHire;
      this.isDeveloper = this.$store.getters.userInfo.isDeveloper;
      this.oldIsDeveloper = this.isDeveloper;
      this.flexDayReferenceDate = this.$store.getters.userInfo.flexDayReferenceDate;
      this.oldFlexDayReferenceDate = this.flexDayReferenceDate;

      //plan info
      const plan = this.$store.getters.selectedPlan;

      if (plan) {
        this.planName = plan.name;
        this.oldPlanName = this.planName;
        this.hoursToRollover = plan.hoursToRollover;
        this.oldHoursToRollover = this.hoursToRollover;
        this.bankedHoursFromPriorYear = plan.hoursBankedPrior;
        this.oldBankedHoursFromPriorYear = this.bankedHoursFromPriorYear;
        this.planYear = plan.year;
        this.planCreated = plan.created;
      }
    },
    saveServiceInfoChanges() {
      this.$store.dispatch("setUserInfo", {
        dateOfHire: this.dateOfHire,
        isDeveloper: this.isDeveloper,
        flexDayReferenceDate: this.flexDayReferenceDate,
      });

      this.oldDateOfHire = this.dateOfHire;
      this.oldIsDeveloper = this.isDeveloper;
      this.oldFlexDayReferenceDate = this.flexDayReferenceDate;
    },
    cancelServiceInfoChanges() {
      this.dateOfHire = this.oldDateOfHire;
      this.isDeveloper = this.oldIsDeveloper;
      this.flexDayReferenceDate = this.oldFlexDayReferenceDate;
    },
    savePlanInfoChanges() {
      this.$store.dispatch("updatePlan", {
        originalName: this.oldPlanName,
        updatedPlan: {
          name: this.planName,
          year: this.planYear,
          hoursToRollover: this.hoursToRollover,
          hoursBankedPrior: this.bankedHoursFromPriorYear,
          created: this.planCreated,
        },
      });

      this.oldPlanName = this.planName;
      this.oldHoursToRollover = this.hoursToRollover;
      this.oldBankedHoursFromPriorYear = this.bankedHoursFromPriorYear;
    },
    cancelPlanInfoChanges() {
      this.planName = this.oldPlanName;
      this.hoursToRollover = this.oldHoursToRollover;
      this.bankedHoursFromPriorYear = this.oldBankedHoursFromPriorYear;
    },
    deletePlan() {
      this.$store.dispatch("deletePlan", this.oldPlanName);
      if (this.$store.state.plans.length > 0) {
        this.$store.dispatch("setSelectedPlan", this.$store.state.plans[0]);
      } else {
        this.$router.push({ route: "/start" });
      }
    },
    deleteAccount() {
      this.$store.dispatch("deleteAccount");
      this.$router.push({ route: "/start" });
    },
  },
  computed: {
    serviceButtonsDisabled() {
      return (
        this.dateOfHire === this.oldDateOfHire &&
        this.isDeveloper === this.oldIsDeveloper &&
        this.flexDayReferenceDate === this.oldFlexDayReferenceDate
      );
    },
    planButtonsDisabled() {
      return (
        this.planName === this.oldPlanName &&
        this.bankedHoursFromPriorYear === this.oldBankedHoursFromPriorYear &&
        this.hoursToRollover === this.oldHoursToRollover
      );
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.serviceButtonsDisabled) {
      this.showUnsavedChangesDialog = true;
      return;
    }
    next();
  },
};
</script>