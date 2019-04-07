import { SALARY_UPDATED, TARGET_UPDATED } from "./actionTypes";

export const setSalary = (target, salary) => ({
  type: SALARY_UPDATED,
  payload: { target, salary }
});

export const setTarget = (target) => ({
  type: TARGET_UPDATED,
  payload: { target }
});
