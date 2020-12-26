import {getPtoDaysForRange} from "./ptoHoursCalculator";

test('weekend', () => {
  expect(getPtoDaysForRange("12/11/2020", "12/15/2020",  false)).toContain("2020-12-15");
});