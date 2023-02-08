import React, { useState, useEffect } from "react";
import axios from "axios";
import SentMessages from "./SentMessages";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/contact.css";
import contactpic from "./message.jpg";

export default function Contact({ user, decodedToken }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [signal, setSignal] = useState(false);
  const navigate = useNavigate();

  console.log("Token in contact: ", decodedToken);

  const _id = decodedToken?._id;

  console.log("HEREEEEEEEEEEEEEEEEEEEEEEEE", _id);

  console.log("USER FROM CONTACT", user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/message", {
        method: "POST",
        body: JSON.stringify({ text, user: _id, user_id: _id }),
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
        setText("");
        setSignal(true);
        alert("Your message has been submitted!");
      }
    } catch (error) {
      setError(error);
      alert("You suck at coding");
      console.log(error);
    }
  };

  console.log("ERRRRRROR", error);

  return (
    <div className="ContactForm">
      <div className="imgForm">
        <img src={contactpic} />
        <form onSubmit={handleSubmit}>
          <h2>Contact your work council representatives</h2>
          <label>
            <textarea
              name="text"
              rows="4"
              cols="50"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="sentMessages">
        <SentMessages
          signal={signal}
          setSignal={setSignal}
          auth={user}
          decodedToken={decodedToken}
        />
      </div>
      <button onClick={() => navigate(`/`)} className="backToMain">
        Back to main
      </button>
    </div>
  );
}
