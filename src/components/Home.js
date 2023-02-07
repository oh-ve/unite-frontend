import { useState, useEffect } from "react";
import { Link, Navlink, Navigate, useNavigate } from "react-router-dom";
import Contact from "./contact/Contact";
import Salary from "./salary/Salary";
import "../App.css";

export default function Home({ user, decodedToken }) {
  const [salaries, setSalaries] = useState([]);
  const [message, setMessage] = useState([]);

  console.log("USER IN HOME", user);

  const navigate = useNavigate();

  console.log(decodedToken);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:8080/salary", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        setSalaries(data);
        // console.log(data);
        //New Fetch Request for message
        const res2 = await fetch("http://localhost:8080/message", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data2 = await res2.json();
        setMessage(data2);
        // console.log(data2);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getData();
    }
  }, [user]);

  console.log("USER", user);

  return (
    <div className="home">
      {!user.isAdmin && (
        <button onClick={() => navigate("/contact")}>Message your admin</button>
      )}
      {user.isAdmin && (
        <button onClick={() => navigate("/admin")}>Inbox</button>
      )}
      <button onClick={() => navigate("/salary")}>Compare your salary</button>
      <button onClick={() => navigate("/board")}>Bulletin board</button>
      <button onClick={() => navigate("/calendar")}>Calendar</button>
    </div>
  );
}
