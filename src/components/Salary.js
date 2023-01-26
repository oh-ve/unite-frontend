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
            type="number"
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
          <select name="age" value={formData.age} onChange={handleChange}>
            <option value="">Select an option</option>
            <option value="20-30">20-30</option>
            <option value="31-40">31-40</option>
            <option value="41-50">41-50</option>
            <option value="51-60">51-60</option>
            <option value="61+">61+</option>
          </select>
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
          Years of employment:
          <select
            name="yearsOfEmployment"
            value={formData.yearsOfEmployment}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="0-5">0-5</option>
            <option value="5-10">5-10</option>
            <option value="10-20">20-30</option>
            <option value="20-30">20-30</option>
            <option value="31-40">31-40</option>
            <option value="40+">40+</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
