import React from "react";
import "./our.css";
import salary from "../Images/thinking.jpg";
import check from "../Images/message.jpg";
import post from "../Images/post.jpg";
import calendar from "../Images/calendar.png";
import { Link } from "react-router-dom";

function OurService(user) {
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
                Lorem ipsum dolor, sit amet elit. quis quae numquam quas ullam
                harum natus explicabo velit atque!
              </p>
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
                    Lorem ipsum dolor, sit amet elit. quis quae numquam quas
                    ullam harum natus explicabo velit atque!
                  </p>
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
                    Lorem ipsum dolor, sit amet elit. quis quae numquam quas
                    ullam harum natus explicabo velit atque!
                  </p>
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
                Lorem ipsum dolor, sit amet elit. quis quae numquam quas ullam
                harum natus explicabo velit atque!
              </p>
            </div>
            <div className="services__item">
              <span className="service__icon">
                <Link to={"/calendar"}>
                  <img src={calendar} className="img-log" />{" "}
                </Link>
              </span>
              <h3 className="service__title"> calendar</h3>
              <p className="description">
                Lorem ipsum dolor, sit amet elit. quis quae numquam quas ullam
                harum natus explicabo velit atque!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OurService;
