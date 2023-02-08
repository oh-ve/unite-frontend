import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function SalaryComparison({ results, formSubmission }) {
  const calculateAverage = (results) => {
    if (results.length === 0) return 0;
    return results.reduce((a, b) => a + b) / results.length;
  };

  const averageSalary = calculateAverage(results).toFixed(2);

  const highestSalary = Math.max(...results).toFixed(2);

  const lowestSalary = Math.min(...results).toFixed(2);

  const yourSalary = formSubmission.salary;

  const data = [
    {
      name: "Lowest salary",
      salary: lowestSalary,
    },
    {
      name: "Your salary",
      yours: yourSalary,
    },
    {
      name: "Average salary",

      salary: averageSalary,
    },
    {
      name: "Highest salary",

      salary: highestSalary,
    },
  ];

  console.log("THIS IS THE AVERAGE SALARY: ", averageSalary);
  console.log("THIS IS THE HIGHEST SALARY:", highestSalary);
  console.log("THIS IS THE LOWEST SALARY:", lowestSalary);
  console.log("THIS IS YOUR SALARY: ", yourSalary);

  return (
    <div className="salaryComparison">
      <h1>Your results </h1>
      <BarChart
        width={700}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="salary" stackId="a" fill="#6c63ff" />
        <Bar dataKey="yours" stackId="a" fill="rgb(240, 175, 53)" />
      </BarChart>
    </div>
  );
}
