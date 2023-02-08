import { useState } from "react";
import { RiUser3Fill, RiLockPasswordFill } from "react-icons/ri";
import { BsFacebook, BsInstagram, BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";

import logo from "../Images/sign up.png";
export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email, password, isAdmin }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      setUser(data);
    }
  };

  return (
    <div
      className="main
    "
    >
      <section className="sign-in">
        <div className="containerr">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={logo} className="img-log" />
              </figure>
              <Link to="/signup">
                <a href="#" className="signup-image-link">
                  Create an account
                </a>
              </Link>
            </div>

            <div className="signin-form">
              <h2 className="form-title">login</h2>
              <form
                className="register-form"
                id="login-form"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="your_name">
                    <i className="zmdi zmdi-account material-icons-name" />
                  </label>
                  <div
                    className="icon
              "
                  >
                    <RiUser3Fill />
                  </div>
                  <input
                    type="text"
                    name="Email"
                    id="your_name"
                    placeholder="email"
                    className="put"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="your_pass"></label>
                  <div
                    className="icon
              "
                  >
                    <RiLockPasswordFill />
                  </div>
                  <input
                    type="password"
                    name="your_pass"
                    id="your_pass"
                    placeholder="Password"
                    className="put"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="agree-term"
                  />
                  <label htmlFor="remember-me" className="label-agree-term">
                    <span>
                      <span />
                    </span>
                    Remember me
                  </label>
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log in"
                  />
                </div>
                {error && <div className="error">{error}</div>}
              </form>
              <div className="social">
                <div className="follow">follow us</div>
                <div>
                  <ul className="ul-">
                    <li className="so">
                      <a href="#">
                        <div className="cn">
                          <BsFacebook />
                        </div>
                      </a>
                    </li>
                    <li className="so">
                      <a href="#">
                        <div className="co">
                          <BsInstagram />
                        </div>
                      </a>
                    </li>
                    <li className="so">
                      <a>
                        <div className="">
                          <BsGithub />
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
