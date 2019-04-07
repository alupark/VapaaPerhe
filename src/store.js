import { SALARY_UPDATED } from "./actionTypes";

import { createStore } from "redux";

const NUMBER_OF_DAYS = 180;

const calculateSalaryIncome = salary => {
  const income = [];

  for (var i = 0;i < NUMBER_OF_DAYS;i++) {
    const perDaySalary = salary / 220;

    if (i === 0) {
      income[i] = perDaySalary;
    } else {
      income[i] = perDaySalary + income[i - 1];
    }
  }

  return income;
};

const calculateFamilyBenefitIncome = salary => {
  const daysOfBenefit = Math.floor(105 / 6 * 7);

  const income = [];

  // Days in KELA parlance are the non-sunday
  const first56Days = Math.floor(56 / 6 * 7);

  var i = 0;
  for (;i < first56Days;i++) {
    var incomePerDay = 27.86 / 6 * 7;

    if (salary >= 9289 && salary <= 58252) {
      incomePerDay = (0.9 * salary / 300) / 6 * 7;
    } else if (salary > 58252) {
      incomePerDay = (174.76 + 0.325 * (salary - 58252) / 300) / 6 * 7;
    }

    if (i === 0) {
      income[i] = incomePerDay;
    } else {
      income[i] = incomePerDay + income[i - 1];
    }
  }


  for (;i < daysOfBenefit;i++) {
    var incomePerDay = 27.86 / 6 * 7;

    if (salary >= 11942 && salary <= 37861) {
      incomePerDay = (0.7 * salary / 300) / 6 * 7;
    } else if (salary >= 37862 && salary <= 58252) {
      incomePerDay= (88.34 + 0.40 * (salary - 37861) / 300) / 6 * 7;
    } else if (salary > 58252) {
      incomePerDay = (115.53 + 0.25 * (salary - 58252) / 300) / 6 * 7;
    }

    if (i === 0) {
      income[i] = incomePerDay;
    } else {
      income[i] = incomePerDay + income[i - 1];
    }
  }

  return income;
};

const calculateIncome = salary => ({
  salaryIncome: calculateSalaryIncome(salary),
  familyBenefitIncome: calculateFamilyBenefitIncome(salary),
})

const initialState = {
  salary: 20000,
  cumulativeIncome: calculateIncome(20000),
};

export default createStore((state = initialState, action) => {
  console.log("BAR")
  switch (action.type) {
    case SALARY_UPDATED:
      console.log("FOO", action.payload.salary)
      return {
        salary: action.payload.salary,
        cumulativeIncome: calculateIncome(action.payload.salary)
      };
    default:
      return state;
  }
});
