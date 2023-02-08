import { useState, useEffect } from "react";
import { Link, Navlink, Navigate, useNavigate } from "react-router-dom";
import Contact from "./Contact";
import Salary from "./Salary";
import logo from "../Images/one1.svg";
import "../components/css/homeheader.css";
import "../components/css/our.css";
import OurService from "./OurService";

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
      <section className="hero__section" id="home">
        <div className="container">
          <div className="hero__wrapper">
            <div className="hero__content">
              <div>
                <h2 className="description">We're Creating Perfect</h2>
                <h2>Work space To</h2>
                <h2 className="highlight">Increase Your Achieves</h2>
              </div>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                expedita vel totam. Culpa, facilis iusto.
              </p>

              <div className="hero__btns">
                {!user.isAdmin && (
                  <button
                    className="primary__btn"
                    onClick={() => navigate("/contact")}
                  >
                    Message your admin
                  </button>
                )}
                {user.isAdmin && (
                  <button
                    className="primary__btn"
                    onClick={() => navigate("/admin")}
                  >
                    Inbox
                  </button>
                )}
                <button
                  className="secondary__btn"
                  onClick={() => navigate("/salary")}
                >
                  Compare your salary
                </button>
              </div>
            </div>

            <div className="hero__img">
              <img src={logo} alt="hero-img" />
            </div>
          </div>
        </div>
      </section>

      <OurService />
    </div>
  );
}
