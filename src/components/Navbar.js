import { React, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../App.css";

export default function Nav({ user, setUser, token }) {
  const HandleClick = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header className="stic">
      <div id="inline">
        <Link to={"/"}>
          <h3>unite!</h3>{" "}
        </Link>
        <p id="welcome">Welcome back, {token?.firstName}</p>
      </div>

      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
      <div className="nav-menu">
        <nav ref={navRef}>
          <Link to={"/"}>
            <p>home</p>{" "}
          </Link>
          <a href="#">about</a>
          <a href="#">services</a>
          <a>
            <div>
              {user !== null && (
                <div classname="nav-loge">
                  <div className="inline">
                    <a className="log-red" onClick={HandleClick}>
                      log out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </a>

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
      </div>
    </header>
  );
}
