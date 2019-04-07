import { SALARY_UPDATED, TARGET_UPDATED } from "./actionTypes";

import { createStore } from "redux";

const NUMBER_OF_DAYS = 180;

const calculateSalaryIncome = (target, salary) => {
  const income = [];

  for (var i = 0;i < NUMBER_OF_DAYS;i++) {
    let perDaySalary = 0;

    if (target === 'me') {
      perDaySalary = salary['me'] / 365;
    } else if (target === 'they') {
      perDaySalary = salary['they'] / 365;
    } else {
      perDaySalary = (salary['me'] + salary['they']) / 365;
    }

    if (i === 0) {
      income[i] = perDaySalary;
    } else {
      income[i] = perDaySalary + income[i - 1];
    }
  }

  return income;
};

const calculateFamilyBenefitIncome = (target, salary) => {
  const daysOfBenefit = Math.floor(105 / 6 * 7);

  const income = [];

  if (target !== 'they') {
    const salaryMe = salary['me'];

    // Days in KELA parlance are the non-sunday
    const first56Days = Math.floor(56 / 6 * 7);

    var i = 0;
    for (;i < first56Days;i++) {
      var incomePerDay = 27.86 / 6 * 7;

      if (salaryMe >= 9289 && salaryMe <= 58252) {
        incomePerDay = (0.9 * salaryMe / 300) / 6 * 7;
      } else if (salaryMe > 58252) {
        incomePerDay = (174.76 + 0.325 * (salaryMe - 58252) / 300) / 6 * 7;
      }

      if (i === 0) {
        income[i] = incomePerDay;
      } else {
        income[i] = incomePerDay + income[i - 1];
      }
    }


    for (;i < daysOfBenefit;i++) {
      var incomePerDay = 27.86 / 6 * 7;

      if (salaryMe >= 11942 && salaryMe <= 37861) {
        incomePerDay = (0.7 * salaryMe / 300) / 6 * 7;
      } else if (salaryMe >= 37862 && salaryMe <= 58252) {
        incomePerDay= (88.34 + 0.40 * (salaryMe - 37861) / 300) / 6 * 7;
      } else if (salaryMe > 58252) {
        incomePerDay = (115.53 + 0.25 * (salaryMe - 58252) / 300) / 6 * 7;
      }

      if (i === 0) {
        income[i] = incomePerDay;
      } else {
        income[i] = incomePerDay + income[i - 1];
      }
    }
  }

  if (target === 'both') {
    const salaryIncomeThey = calculateSalaryIncome('they', salary);

    for (let i = 0;i < daysOfBenefit;i++) {
      income[i] = income[i] + salaryIncomeThey[i];
    }
  }

  return income;
};

const calculateIncome = (target, salary) => ({
  salaryIncome: calculateSalaryIncome(target, salary),
  familyBenefitIncome: calculateFamilyBenefitIncome(target, salary),
})

const salary = {
  me: 40000,
  they: 40000
};

const initialState = {
  salary,
  preBaby: 42,
  target: 'both',
  cumulativeIncome: calculateIncome('both', salary),
};

export default createStore((state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case SALARY_UPDATED:
      const salaryUpdate = {
        ...state.salary,
        [action.payload.target]: action.payload.salary
      };

      return {
        ...state,
        salary: salaryUpdate,
        cumulativeIncome: calculateIncome(state.target, salaryUpdate)
      };
    case TARGET_UPDATED:
      return {
        ...state,
        target: action.payload.target,
        cumulativeIncome: calculateIncome(action.payload.target, state.salary)
      }
    default:
      return state;
  }
});
