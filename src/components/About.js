import Ve from "../Images/Ve.jpg";
import dola from "../Images/Dolaaa.jpeg";
import GPT from "../Images/chat-GPT.jpg";
import "./about.css";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
export default function About() {
  return (
    <div className="About">
      <div>
        <h1>Our Team</h1>
      </div>
      <div className="card-flex">
        <div className="card-client">
          <div className="user-picture">
            <img src={Ve} />
          </div>
          <p className="name-client">
            Ve <span>Full-stack Developer </span>
          </p>
          <div class="social-media">
            <a href="#">
              <i>
                <BsInstagram />
              </i>
              <span className="tooltip-social">Instagram</span>
            </a>
            <a href="#">
              <i>
                <BsFacebook />
              </i>
              <span className="tooltip-social">Facebook</span>
            </a>
            <a href="#">
              <i>
                <BsLinkedin />
              </i>
              <span className="tooltip-social">LinkedIn</span>
            </a>
          </div>
        </div>
        {/* --------------------------------- */}
        <div className="card-client">
          <div className="user-picture">
            <img src={dola} />
          </div>
          <p className="name-client">
            Dola <span>Full-stack Developer </span>
          </p>
          <div class="social-media">
            <a href="#">
              <i>
                <BsInstagram />
              </i>
              <span className="tooltip-social">Instagram</span>
            </a>
            <a href="#">
              <i>
                <BsFacebook />
              </i>
              <span className="tooltip-social">Facebook</span>
            </a>
            <a href="#">
              <i>
                <BsLinkedin />
              </i>
              <span className="tooltip-social">LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="card-client">
          <div className="user-picture">
            <img src={GPT} />
          </div>
          <p className="name-client">
            Chat GPT <span>Full-stack Developer </span>
          </p>
          <div class="social-media">
            <a href="#">
              <i>
                <BsInstagram />
              </i>
              <span className="tooltip-social">Instagram</span>
            </a>
            <a href="#">
              <i>
                <BsFacebook />
              </i>
              <span className="tooltip-social">Facebook</span>
            </a>
            <a href="#">
              <i>
                <BsLinkedin />
              </i>
              <span className="tooltip-social">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
