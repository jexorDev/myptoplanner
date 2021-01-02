import { getFlexDays } from "@/functions/flexDayCalculator";
import { getPayDays } from "@/functions/payDayCalculator";
import { getPtoBreakdown } from "@/functions/employeeInfoCalculator";
import { getHolidays } from "@/functions/holidayCalculator";

export default {
    name: "plannerMixin",
    computed: {
        ptoDates: function () {
            return this.$store.getters.ptoDates;
        },
        flexDays() {
            return getFlexDays(this.$store.getters.userInfo.flexDayReferenceDate);
        },
        holidays() {
            return getHolidays(this.$store.getters.selectedPlan.year);
        },
        payDays() {
            return getPayDays(
                this.$store.getters.selectedPlan.year
            );
        },
        totalPtoPlanned() {
            return this.$store.getters.ptoDates
                    .reduce((acc, val) => {
                        return acc + val.hours;
                    }, 0);
        },
        totalPtoAccrualHours() {
            return getPtoBreakdown(
                this.$store.getters.userInfo.dateOfHire,
                this.$store.getters.selectedPlan.year,
            ).totalHours;
        }
    }
}