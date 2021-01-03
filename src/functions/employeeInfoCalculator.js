import moment from 'moment';

export function getEmployeeInYear(hireDate, onDate) {
    const momentHireDate = moment(hireDate);
      const momentOnDate = moment(onDate);

      const serviceYears = moment
        .duration(momentOnDate.diff(momentHireDate))
        .asYears();
      return Math.floor(serviceYears) + 1;
}

export function getHoursPerPay(inYear) {
      let ptoHoursPerPay = 5;

     if (inYear > 2) {
        ptoHoursPerPay = 6;
      }
      if (inYear > 4) {
        ptoHoursPerPay = 7;
      }
      if (inYear > 6) {
        ptoHoursPerPay = 8;
      }
      if (inYear > 10) {
        ptoHoursPerPay = 9;
      }
      if (inYear > 14) {
        ptoHoursPerPay = 10;
    }
    
    return ptoHoursPerPay;
}

export function getPtoBreakdown(hireDate, planYear) {
    const momentHireDate = moment(hireDate);
    const planYearInt = parseInt(planYear);
    let ptoIncreaseMonth = momentHireDate.month();
    if (momentHireDate.day() > 1) {
        ptoIncreaseMonth += 1;

        if (ptoIncreaseMonth > 12) {
            ptoIncreaseMonth = 1;
        }
    }

    const ptoIncreaseDate = moment({ month: ptoIncreaseMonth, day: 1, year: planYearInt });
    
    const inYearPriorAnniversary = getEmployeeInYear(momentHireDate, moment({ month: momentHireDate.month(),day: momentHireDate.day() -1, year: planYearInt }));
    const inYearAfterAnniversary = getEmployeeInYear(momentHireDate, ptoIncreaseDate);

    
    const ptoHoursPerPayPriorAnniversary = getHoursPerPay(inYearPriorAnniversary);
    const ptoHoursPerPayAfterAnniversary = getHoursPerPay(inYearAfterAnniversary);

    const totalPtoHoursPriorAnniversary = 2 * ptoIncreaseDate.month() * ptoHoursPerPayPriorAnniversary;
    const totalPtoHoursAfterAnniversary = 2 * (12 - ptoIncreaseDate.month() ) * ptoHoursPerPayAfterAnniversary;

    let breakdown = [];

    if (ptoHoursPerPayPriorAnniversary === ptoHoursPerPayAfterAnniversary) {
        //no change in accrual this year
        breakdown.push({
            dateStart: moment({ month: 0, day: 1, year: planYearInt }),
            dateEnd: moment({ month: 11, day: 31, year: planYearInt }),
            ptoHoursPerPay: ptoHoursPerPayPriorAnniversary,
            totalPtoHours: totalPtoHoursPriorAnniversary + totalPtoHoursAfterAnniversary
        });
    }
    else {
        breakdown.push({
            dateStart: moment({ month: 0, day: 1, year: planYearInt }),
            dateEnd: moment(ptoIncreaseDate).add(-1, 'day'),
            ptoHoursPerPay: ptoHoursPerPayPriorAnniversary,
            totalPtoHours: totalPtoHoursPriorAnniversary
        });
         breakdown.push({
            dateStart: ptoIncreaseDate,
            dateEnd: moment({ month: 11, day: 31, year: planYearInt }),
            ptoHoursPerPay: ptoHoursPerPayAfterAnniversary,
            totalPtoHours: totalPtoHoursAfterAnniversary
        });
    }
    return {
        totalHours: totalPtoHoursPriorAnniversary + totalPtoHoursAfterAnniversary,
        breakdown: breakdown
    };
}

export function getRolloverMax(hireDate, planYear) {
    const inYear = getEmployeeInYear(hireDate, moment({ month: 11, day: 31, year: planYear }));

    let maxRolloverHours = 24;

    if (inYear > 5) {
        maxRolloverHours = 32;
    }
    if (inYear > 9) {
        maxRolloverHours = 40;
    }

    return maxRolloverHours;
}

export function getPtoHoursOnDay(date, hireDate, planYear) {
    const ptoBreakdown = getPtoBreakdown(hireDate, planYear);
    
    if (ptoBreakdown.breakdown.length === 1) {
        return ptoBreakdown.breakdown[0].ptoHoursPerPay
    } else {
        if (moment(date).isSameOrBefore(moment(ptoBreakdown.breakdown[0].dateEnd))) {
            return ptoBreakdown.breakdown[0].ptoHoursPerPay;
        } else {
            return ptoBreakdown.breakdown[1].ptoHoursPerPay;
        }
    }
}