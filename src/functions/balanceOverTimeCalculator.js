import { getPtoHoursOnDay } from "./employeeInfoCalculator";
import moment from "moment";

export function getBalanceOverTime(pto, payday, hireDate, planYear, beginningBalance) {
 let eventList = [
        ...pto.map(pto => ({
            type: "usage",
            date: pto.date,
            hours: pto.hours * -1
        })),
        ...payday.map(payday => ({
            type: "add",
            date: payday,
            hours: getPtoHoursOnDay(payday, hireDate, planYear)
        }))
    ];

    eventList.push({
        type: "beginning balance",
        date: moment({ month: 0, day: 1, year: planYear }).format("YYYY-MM-DD"),
        hours: beginningBalance
    });

        eventList = eventList.map(currentEvent => ({
        ...currentEvent,
        runningTotal: eventList.filter(allEvents => moment(allEvents.date).isBefore(moment(currentEvent.date)) || 
        (moment(allEvents.date).isSame(moment(currentEvent.date)))).reduce((acc, value) => { return acc + value.hours }, 0)
        }));
    
    let balances = [];

    for (let i = 0; i < 12; i++) {
        balances.push(getMonthTotal(eventList, i));
    }

    return balances;
}

function getMonthTotal(eventList, month) {
    return eventList.filter(event => moment(event.date).isSameOrBefore(moment({month: month}).endOf("month"))).reduce((acc, event) => { return acc + event.hours }, 0);
}