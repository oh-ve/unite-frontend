import React, { useState, useEffect } from "react";

export default function AdminContact() {
  const [adminMessages, setAdminMessages] = useState([]);
  const [error, setError] = useState();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/message/admin", {
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
    <div>
      <h2>Messages</h2>
      {adminMessages.map((message) => {
        let date = new Date(message.createdAt).toLocaleDateString();
        return (
          <div>
            <p>{date}</p>
            <p>{message.text}</p>
          </div>
        );
      })}
    </div>
  );
}
