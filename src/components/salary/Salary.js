import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import SalaryComparison from "./SalaryComparison";
import { Navigate } from "react-router-dom";
import "../css/salary.css";

export default function Salary({ user }) {
  const [error, setError] = useState(null);
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [yearsOfEmployment, setYearsOfEmployment] = useState("");
  const [salarySignal, setSalarySignal] = useState(false);
  const [salaryResults, setSalaryResults] = useState([]);
  const [average, setAverage] = useState();
  const navigate = useNavigate();

  const formSubmission = {
    salary,
    position,
    age,
    gender,
    yearsOfEmployment,
  };

  // const handleChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postResponse = await fetch("http://localhost:8080/salary", {
        method: "POST",
        body: JSON.stringify(formSubmission),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const postData = await postResponse.json();

      console.log("POST DATA: ", postData);

      if (!postResponse.ok) {
        setError(postData.error);
      }

      if (postResponse.ok) {
        const getResponse = await fetch(
          `http://localhost:8080/salary/calculate/${age}/${gender}/${yearsOfEmployment}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const results = await getResponse.json();

        if (!getResponse.ok) {
          setError(results.error);
        }

        if (getResponse.ok) {
          setError(null);

          setSalaryResults(results.map((result) => parseFloat(result.salary)));
          console.log("THIS IS THE DATA WE FETCH: ", results);
        }
      }
    } catch (error) {
      setError(error);
      alert("You suck at coding");
      console.log(error);
    }
  };

  console.log("THIS IS AFTER WE SET THE SALARIES: ", salaryResults);

  return (
    <div className="salary">
      {salaryResults.length === 0 ? (
        <div className="salaryForm">
          <h2>Check your salary</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Salary:
              <input
                type="number"
                className="no-arrows"
                name="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Position:
              <input
                type="text"
                name="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              />
            </label>
            <br />
            <label>
              Age:
              <input
                type="text"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </label>
            <br />
            <label id="gender">
              Gender:
              <div id="genderButtons">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onClick={(e) => setGender("male")}
                  required
                />{" "}
                Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={(e) => setGender("female")}
                  required
                />{" "}
                Female
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  onChange={(e) => setGender("other")}
                  required
                />{" "}
                Other
              </div>
            </label>

            <br />
            <label>
              Years of Employment:
              <input
                type="text"
                name="yearsOfEmployment"
                value={yearsOfEmployment}
                onChange={(e) => setYearsOfEmployment(e.target.value)}
                required
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : null}
      {salaryResults.length !== 0 ? (
        <div>
          <SalaryComparison
            results={salaryResults}
            formSubmission={formSubmission}
          />
          <button
            className="backToMain"
            onClick={() => {
              setSalaryResults([]);
              setSalary("");
              setPosition("");
              setAge("");
              setGender("");
              setYearsOfEmployment("");
            }}
          >
            Back
          </button>
        </div>
      ) : null}
    </div>
  );
}
