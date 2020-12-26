import moment from "moment";

export function getFlexDays(flexDayReferenceDate) {
    if (!flexDayReferenceDate) return null;

    flexDayReferenceDate = moment(flexDayReferenceDate);
    if (!flexDayReferenceDate.isValid()) return null;

    let flexDays = [flexDayReferenceDate.format("YYYY-MM-DD")];

    const currentDateReverse = moment(flexDayReferenceDate).add(-2, 'weeks');
    const currentDateForward = moment(flexDayReferenceDate).add(2, 'weeks');


    while (currentDateReverse.year() === flexDayReferenceDate.year()) {
        flexDays.push(currentDateReverse.format("YYYY-MM-DD"));
        currentDateReverse.add(-2, 'weeks');
    }
    while (currentDateForward.year() === flexDayReferenceDate.year()) {
        flexDays.push(currentDateForward.format("YYYY-MM-DD"));
        currentDateForward.add(2, "weeks");
    }

    return flexDays;
}

