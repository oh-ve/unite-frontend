import React, { useState } from "react";
import { Form } from "react-router-dom";

export default function Salary({ user }) {
  const [error, setError] = useState(null);
  const [salary, setSalary] = useState("");
  const [position, setPosition] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [yearsOfEmployment, setYearsOfEmployment] = useState("");

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
      const response = await fetch("http://localhost:8080/salary", {
        method: "POST",
        body: JSON.stringify(formSubmission),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      console.log("DATA", data);

      if (!response.ok) {
        setError(data.error);
      }

      if (response.ok) {
        setError(null);
        alert("Succesfull");
      }
    } catch (error) {
      setError(error);
      alert("You suck at coding");
      console.log(error);
    }
  };

  return (
    <div className="salary">
      <h2>Check your salary</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Salary:
          <input
            type="text"
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
        <label>
          Gender:
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
        </label>

        <br />
        <label>
          Years of Employment
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
  );
}
