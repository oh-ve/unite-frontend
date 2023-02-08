import React, { useState, useEffect } from "react";
import "../css/contact.css";
import { Navigate, useNavigate } from "react-router-dom";

export default function Sent({ signal, setSignal }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  console.log("UZZZERRR", user);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/message", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const result = await response.json();
      console.log("RESULT: ", result);
      /*       setMessages(
        result.filter((message) => message.user._id === decodedToken._id)
      ); */
      if (response.ok) {
        setError(null);
        setMessages(result.reverse());
      }

      if (!response.ok) {
        console.log("blyat we got error", error);
        setError(result.error);
      }
    };
    fetchData();
  }, [signal]);

  useEffect(() => {
    setSignal(false);
  }, [messages]);

  console.log("MESSAGES: ", messages);
  return (
    <div id="sentMessages">
      <h2>Sent messages</h2>
      {messages &&
        messages.map((message) => {
          let date = new Date(message.createdAt).toLocaleDateString();

          return (
            <div className="singleMessage">
              <p className="sentDate">{date}</p>
              <p className="sentText">{message.text}</p>
            </div>
          );
        })}
      <button onClick={() => navigate(`/`)} className="backToMain">
        Back to main
      </button>
    </div>
  );
}
