import { SALARY_UPDATED } from "./actionTypes";

export const setSalary = salary => ({
  type: SALARY_UPDATED,
  payload: { salary }
});
