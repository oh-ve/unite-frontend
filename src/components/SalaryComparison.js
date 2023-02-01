import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

export default function SalaryComparison({ results, formSubmission }) {
  const calculateAverage = (results) => {
    if (results.length === 0) return 0;
    return results.reduce((a, b) => a + b) / results.length;
  };

  const averageSalary = Math.round(calculateAverage(results) * 100) / 100;

  const highestSalary = Math.max(...results);

  const lowestSalary = Math.min(...results);

  const yourSalary = formSubmission.salary;

  console.log("THIS IS THE AVERAGE SALARY: ", averageSalary);
  console.log("THIS IS THE HIGHEST SALARY:", highestSalary);
  console.log("THIS IS THE LOWEST SALARY:", lowestSalary);
  console.log("THIS IS YOUR SALARY: ", yourSalary);

  return (
    <div className="salaryComparison">
      <h2>Your results </h2>

      <p> {averageSalary}</p>
    </div>
  );
}
