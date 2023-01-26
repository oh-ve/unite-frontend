import React, { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [message, setMessage] = useState("");
  const [date, setDate] = useState();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, date }),
    });

    setDate(new Date());
    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("message", JSON.stringify(message));
      setMessage("");
      alert("Your message has been submitted!");
    }
  };

  return (
    <div>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Text:
          <textarea
            name="text"
            rows="4"
            cols="50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
