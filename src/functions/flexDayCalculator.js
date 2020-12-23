import moment from "moment";

export default function getFlexDays(flexDayReferenceDate) {
    if (!flexDayReferenceDate) return null;

    flexDayReferenceDate = moment(flexDayReferenceDate);
    if (!flexDayReferenceDate.isValid()) return null;

    //let flexDays = [flexDayReferenceDate.toString()];

    const currentDate = moment(flexDayReferenceDate).add(2, 'weeks');

    console.log(flexDayReferenceDate)
    console.log(currentDate.add(2, 'weeks'))
    // while (currentDate.year() === flexDayReferenceDate.year()) {
    //     currentDate.add(2, 'weeks');
    //     if (currentDate.toString() === flexDayReferenceDate.toString()) break;
    //     console.log(currentDate)
    //     flexDays.push(currentDate.toString());
    // }

    //return flexDays;
}

