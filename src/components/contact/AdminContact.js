import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/contact.css";

export default function AdminContact() {
  const [adminMessages, setAdminMessages] = useState([]);
  const [error, setError] = useState();
  const link1 = "https://unite.onrender.com";
  const link2 = "http://localhost:8080";
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(link1 + "/message/admin", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const result = await response.json();
      console.log("RESULT: ", result);

      if (response.ok) {
        setError(null);
        setAdminMessages(result?.messages);
        console.log("ADMIN MESSAGES: ", adminMessages);
      }

      if (!response.ok) {
        console.log("blyat we got error", error);
        setError(result.error);
      }
    };
    fetchData();
  }, []);

  return (
    <div id="adminMessages">
      <h1>Inbox</h1>
      {adminMessages.map((message) => {
        let date = new Date(message.createdAt).toLocaleDateString();
        return (
          <div>
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
