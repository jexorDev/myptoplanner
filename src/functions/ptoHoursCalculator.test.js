import {getPtoDays} from "./ptoHoursCalculator";

test('weekend', () => {
  expect(getPtoDays("12/11/2020", "12/15/2020",  ["12/14/2020"], ["12/11/2020"])).toContain("12/15/2020");
});