import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Patience from "./components/Patience";
import Contact from "./components/Contact";
import Salary from "./components/Salary";
import "./App.css";

import { useJwt } from "react-jwt";

function App() {
  const [user, setUser] = useState(null);

  const [me, setMe] = useState("");

  const token = user ? user.token : null;

  const { decodedToken, isExpired } = useJwt(token);

  console.log("decodedToken: ", decodedToken);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  console.log("USER IN APP", user);

  const getUser = async () => {
    try {
      const res = await fetch(`http://localhost:8080/user/${decodedToken._id}`);
      const data = await res.json();
      setMe(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("HEY, THATS ME", me);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} token={decodedToken} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Home decodedToken={decodedToken} user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={
            !user ? (
              <Signup setUser={setUser} />
            ) : (
              <Navigate to="/registration" />
            )
          }
        />
        <Route path="/registration" element={<Patience />} />
        <Route
          path="/contact"
          element={<Contact user={user} me={me} decodedToken={decodedToken} />}
        />
        <Route
          path="/salary"
          element={<Salary user={user} me={me} decodedToken={decodedToken} />}
        />
      </Routes>
    </div>
  );
}

export default App;
