import React, { useState } from "react";

export default function Salary() {
  const [formData, setFormData] = useState({
    salary: "",
    position: "",
    age: "",
    gender: "",
    yearsOfEmployment: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // send formData to server endpoint for storage
    fetch("http://localhost:8080/salary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={(event) => {
              const age = event.target.value;
              if (!isNaN(age)) {
                handleChange(event);
              }
            }}
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
            checked={formData.gender === "male"}
            onChange={handleChange}
            required
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
            required
          />{" "}
          Female
          <input
            type="radio"
            name="gender"
            value="other"
            checked={formData.gender === "other"}
            onChange={handleChange}
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
            value={formData.yearsOfEmployment}
            onChange={(event) => {
              const yearsOfEmployment = event.target.value;
              if (!isNaN(yearsOfEmployment)) {
                handleChange(event);
              }
            }}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
