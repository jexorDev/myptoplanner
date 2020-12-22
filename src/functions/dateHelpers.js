import moment from "moment";

export function formatDate(date) {
    if (!date) return null

    const momentDate = moment(date);
    if (!momentDate.isValid()) return null;

    return momentDate.format("MM/DD/YYYY").toString();
}

export function getIsoDateString(date) {
    if (!date) return null;

    const momentDate = moment(date);
    if (!momentDate.isValid()) return null;

    return momentDate.toISOString().substring(0, 10);
}