import moment from "moment";

function getPtoDays(fromDate, toDate, isDeveloper, holidays, flexDays) {
    const momentFromDate = moment(fromDate);
    const momentToDate = moment(toDate);
    let ptoDays = [];

    for (let currentDate = moment(momentFromDate); currentDate.isSameOrBefore(momentToDate); currentDate.add(1, 'day')) {
        if (currentDate.day() === 0 || currentDate.day() === 6) continue;
        if (holidays.filter(x => x === currentDate.format("YYYY-MM-DD")).length > 0) continue;
        if (flexDays.filter(x => x === currentDate.format("YYYY-MM-DD")).length > 0) continue;
        
        ptoDays.push({date: currentDate.format("YYYY-MM-DD"), hours: getFullDayPtoHours(currentDate, isDeveloper) });
    }

    return ptoDays;
}

function getFullDayPtoHours(day, isDeveloper) {
     if (isDeveloper) {
        if (moment(day).day() === 5) {
            return 8;
        } else {
            return 9;
        }
    } else {
        return 8;
    }
}

export function getTotalPtoHours(ptoDays) {
    if (!ptoDays) return 0;

    let totalPtoHours = 0;

    for (let ptoDay of ptoDays) {
        totalPtoHours += ptoDay.hours;
    }

    return totalPtoHours;
    //return ptoDays.reduce((accumulator, currentValue) => { accumulator + currentValue.hours });
}

export function getPtoDaysForRange(fromDate, toDate, isDeveloper) {
    return getPtoDays(fromDate, toDate, isDeveloper, [], []);
}

export function getPtoDayForSingle(date, isDeveloper, isAllDay, customHourEntry) {
    if (!isAllDay) {
        return [{ date: moment(date).format("YYYY-MM-DD"), hours: customHourEntry }];
    } else {
        return getPtoDays(date, date, isDeveloper, [], []);
    }

}
