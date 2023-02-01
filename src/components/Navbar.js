import { Link } from "react-router-dom";
import Logo from "../Images/unite.png";

export default function Navbar({ user, setUser, token }) {
  const handleClick = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="container">
      <div className="title">
        <Link to="/">
          <img
            src={Logo}
            alt="Unite"
            style={{ width: "100px", height: "100px" }}
          />
        </Link>
      </div>
      <nav>
        {user !== null && (
          <div>
            <span>Welcome back, {token?.firstName}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {user === null && (
          <div>
            <Link to="login">Login</Link>
            <Link to="signup">Signup</Link>
          </div>
        )}
      </nav>
    </div>
  );
}
