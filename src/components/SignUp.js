import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import logo from "../Images/sign-up.png";
import { RiUser3Fill, RiLockPasswordFill } from "react-icons/ri";
import { MdEmail, MdWork } from "react-icons/md";

export default function Signup({ setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const link1 = "https://unite.onrender.com";
  const link2 = "http://localhost:8080";
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    const response = await fetch(link1 + "/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName, lastName, isAdmin }),
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      // localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      navigate("/registration");
    }
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  console.log("ADMIN: ", isAdmin);

  return (
    <div className="main">
      <section className="signup">
        <div className="containerr">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">unite!</h2>
              <form
                className="register-form"
                id="register-form"
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label className="lab" htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <div
                    className="icon
              "
                  >
                    <RiUser3Fill />
                  </div>
                  <input
                    className="put"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                  <div className="form-group">
                    <label className="lab" htmlFor="email">
                      <i className="zmdi zmdi-email"></i>
                    </label>
                    <div
                      className="icon
              "
                    >
                      <RiUser3Fill />
                    </div>
                    <input
                      className="put"
                      type="name"
                      name="last name"
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass" className="lab">
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <div
                      className="icon
              "
                    >
                      <MdEmail />
                    </div>
                    <input
                      className="put"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="re-pass" className="lab">
                      <i className="zmdi zmdi-lock-outline"></i>
                    </label>
                    <div
                      className="icon
              "
                    >
                      <RiLockPasswordFill />
                    </div>
                    <input
                      className="put"
                      type="password"
                      name="re_pass"
                      id="re_pass"
                      placeholder=" your password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div
                    className="icon
              "
                  >
                    <MdWork />
                  </div>
                  <input
                    className="put"
                    type="text"
                    placeholder=" company"
                    name="company"
                  />

                  <div className="form-group">
                    <label>
                      Create new company space
                      <input
                        type="checkbox"
                        name="agree-term"
                        id="agree-term"
                        className="agree-term"
                        onClick={toggleAdmin}
                        checked={isAdmin}
                      />
                    </label>
                  </div>
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="Register"
                  />
                </div>
                {error && <div className="error">{error}</div>}
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src={logo} className="img-log" />
              </figure>
              <Link to="/login">
                <a href="#" className="signup-image-link">
                  I am already member
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
