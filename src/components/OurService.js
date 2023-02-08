import React from "react";
import "../components/css/our.css";
import logo from "../Images/thinking.jpg";
import check from "../Images/message.jpg";
import post from "../Images/post.jpg";

function OurService() {
  return (
    <div>
      <section id="service">
        <div className="container">
          <div className="services__top-content">
            <h2 className="highlight"> Our Services</h2>
          </div>

          <div className="service__item-wrapper">
            <div className="services__item">
              <span className="service__icon">
                <img src={logo} className="img-log" />
              </span>
              <h3 className="service__title"> chcek your Salary</h3>
              <p className="description">
                Lorem ipsum dolor, sit amet elit. quis quae numquam quas ullam
                harum natus explicabo velit atque!
              </p>
            </div>
            <div className="services__item">
              <span className="service__icon">
                <img src={check} className="img-log" />
              </span>
              <h3 className="service__title">text your manger</h3>
              <p className="description">
                Lorem ipsum dolor, sit amet elit. quis quae numquam quas ullam
                harum natus explicabo velit atque!
              </p>
            </div>
            <div className="services__item">
              <span className="service__icon">
                <img src={post} className="img-log" />
              </span>
              <h3 className="service__title"> share your ideas</h3>
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
