import { useState, useEffect } from "react";
import { Link, Navlink, Navigate, useNavigate } from "react-router-dom";
import Contact from "./Contact";
import Salary from "./Salary";
import "../App.css";

export default function Home({ user, decodedToken }) {
  const [salaries, setSalaries] = useState([]);
  const [message, setMessage] = useState([]);

  console.log("USER IN HOME", user);

  const navigate = useNavigate();

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

  console.log("HERE", salaries);

  return (
    <div className="home">
      <button onClick={() => navigate("/salary")}>Compare your salary</button>
      <button onClick={() => navigate("/contact")}>Message your admin</button>
    </div>
  );
}
