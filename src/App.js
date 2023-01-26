import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Patience from "./components/Patience";

import "./App.css";
import Contact from "./components/Contact";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  console.log("USER", user);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={user ? <Home user={user} /> : <Navigate to="/login" />}
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
        <Route path="/contact" element={<Contact user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
