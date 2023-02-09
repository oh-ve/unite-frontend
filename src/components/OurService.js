import React from "react";
import "./our.css";
import salary from "../Images/thinking.jpg";
import check from "../Images/message.jpg";
import post from "../Images/post.jpg";
import calendar from "../Images/calendar.png";
import { Link, useNavigate } from "react-router-dom";

function OurService(user) {
  const navigate = useNavigate();
  return (
    <div>
      <section id="service">
        <div className="container">
          <div className="service__item-wrapper">
            <div className="services__item">
              <span className="service__icon">
                <Link to={"/salary"}>
                  <img src={salary} className="img-log" />{" "}
                </Link>
              </span>
              <h3 className="service__title"> check your salary</h3>
              <p className="description">
                Check your salary 100% anonymously in order to determine if
                you're being payed fairly.
              </p>
              <button
                className="serviceButton"
                onClick={() => navigate(`/salary`)}
              >
                Check salary
              </button>
            </div>

            <div className="services__item">
              {!user.user.isAdmin ? (
                <>
                  <span className="service__icon">
                    <Link to={"/contact"}>
                      <img src={check} className="img-log" />{" "}
                    </Link>
                  </span>
                  <h3 className="service__title">contact work council</h3>
                  <p className="description">
                    Connect with your work council representatives for support
                    and resolution of work-related issues!
                  </p>
                  <button
                    className="serviceButton"
                    onClick={() => navigate(`/contact`)}
                  >
                    Contact
                  </button>
                </>
              ) : (
                <>
                  <span className="service__icon">
                    <Link to={"/admin"}>
                      <img src={check} className="img-log" />{" "}
                    </Link>
                  </span>
                  <h3 className="service__title">inbox</h3>
                  <p className="description">
                    Easily monitor employee concerns, complaints and inquiries
                    in your work council inbox.
                  </p>
                  <button
                    className="serviceButton"
                    onClick={() => navigate(`/admin`)}
                  >
                    Inbox
                  </button>
                </>
              )}
            </div>
            <div className="services__item">
              <span className="service__icon">
                <Link to={"/board"}>
                  <img src={post} className="img-log" />{" "}
                </Link>
              </span>
              <h3 className="service__title"> bulletin board</h3>
              <p className="description">
                Stay informed, up-to-date and connected with all your coworkers
                on our interactive bulletin board.
              </p>
              <button
                className="serviceButton"
                onClick={() => navigate(`/board`)}
              >
                Board
              </button>
            </div>
            <div className="services__item">
              <span className="service__icon">
                <Link to={"/calendar"}>
                  <img src={calendar} className="img-log" />{" "}
                </Link>
              </span>
              <h3 className="service__title"> calendar</h3>
              <p className="description">
                Stay organized and on schedule with our comprehensive work
                calendar, easily view and manage appointments and events.
              </p>
              <button
                className="serviceButton"
                onClick={() => navigate(`/calendar`)}
              >
                Calendar
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurService;
