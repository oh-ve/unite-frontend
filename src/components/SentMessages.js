import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Sent({ signal, setSignal }) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  //   console.log("SENT MESSAGES AUTH: ", auth);

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
        setMessages(result);
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
    <div>
      <h2>Sent messages</h2>
      {messages &&
        messages.map((message) => {
          return <div>{message.text}</div>;
        })}
    </div>
  );
}
