import { Link } from "react-router-dom";

export default function Navbar({ user, setUser, token }) {
  const handleClick = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  console.log(user);

  return (
    <div className="container">
      <div className="title">
        <Link to="/">Unite!</Link>
      </div>
      <nav>
        {user !== null && (
          <div>
            {/*          <span>Welcome back, {token.firstName}</span> */}
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
