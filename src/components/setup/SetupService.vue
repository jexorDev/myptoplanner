<template>
  <div>
    <v-row>
      <v-col cols="4">
        Date of hire
        <div class="font-weight-light">
          This is used to calculate how many hours of PTO you will receive
        </div>
      </v-col>
      <v-col>
        <DatePickerInMenu
          label="Date of Hire"
          :selectedDate.sync="dateOfHireSync"
        ></DatePickerInMenu>
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-checkbox
          v-model="isDeveloperSync"
          label="I'm a developer"
        ></v-checkbox>
        <div v-if="isDeveloperSync" class="font-weight-light">
          Please enter a date that your flex day lands on. If you do not
          participate in flex scheduling, please leave this box unchecked.
        </div>
      </v-col>
      <v-col>
        <div v-if="isDeveloperSync">
          <DatePickerInMenu
            label="Flex Day"
            :selectedDate.sync="flexDayReferenceDateSync"
          ></DatePickerInMenu>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import DatePickerInMenu from "@/components/Inputs/DatePickerInMenu";

export default {
  name: "SetupService",
  components: {
    DatePickerInMenu,
  },
  props: {
    dateOfHire: {
      type: String,
      required: true,
    },
    isDeveloper: {
      type: Boolean,
      required: true,
    },
    flexDayReferenceDate: {
      type: String,
      required: true,
    },
  },
  computed: {
    dateOfHireSync: {
      get() {
        return this.dateOfHire;
      },
      set(value) {
        this.$emit("update:dateOfHire", value);
      },
    },
    isDeveloperSync: {
      get() {
        return this.isDeveloper;
      },
      set(value) {
        this.$emit("update:isDeveloper", value);
      },
    },
    flexDayReferenceDateSync: {
      get() {
        return this.flexDayReferenceDate;
      },
      set(value) {
        this.$emit("update:flexDayReferenceDate", value);
      },
    },
  },
};
</script>