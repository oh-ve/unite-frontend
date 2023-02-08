import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Patience from "./components/Patience";
import About from "./components/About";
import Contact from "./components/contact/Contact";
import Salary from "./components/salary/Salary";
import AdminContact from "./components/contact/AdminContact";
import Board from "./components/bulletinBoard/Board";
import OnePost from "./components/bulletinBoard/OnePost";
import CalendarPage from "./components/calendar/Calendar";
import OurService from "./components/OurService";
import Mission from "./components/Mission";
import "./App.css";
import "./components/css/our.css";

import { useJwt } from "react-jwt";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [me, setMe] = useState("");

  const token = user ? user.token : null;

  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [user]);

  // const getUser = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:8080/user/${decodedToken._id}`);
  //     const data = await res.json();
  //     setMe(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // console.log("USER IN APP.JS: ", user);
  return (
    <div className="App">
      {user && <Navbar user={user} setUser={setUser} token={decodedToken} />}
      <Routes>
        <Route
          path="/"
          element={
            user && user ? (
              <Home decodedToken={decodedToken} user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/"
          element={
            user ? (
              <OurService decodedToken={decodedToken} user={user} />
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
          element={
            user ? (
              <Contact user={user} me={me} decodedToken={decodedToken} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/salary"
          element={
            user ? (
              <Salary user={user} me={me} decodedToken={decodedToken} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin"
          element={
            user?.isAdmin === true ? (
              <AdminContact user={user} me={me} decodedToken={decodedToken} />
            ) : (
              <Navigate to="/contact" />
            )
          }
        />
        <Route
          path="/board"
          element={
            user ? (
              <Board user={user} me={me} decodedToken={decodedToken} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/board/:id"
          element={
            user ? (
              <OnePost user={user} me={me} decodedToken={decodedToken} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="calendar"
          element={
            user ? (
              <CalendarPage user={user} me={me} decodedToken={decodedToken} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="about"
          element={user ? <About /> : <Navigate to="/login" />}
        />
        <Route
          path="mission"
          element={user ? <Mission /> : <Navigate to="/login" />}
        />
        {/* <Route
          path="/admin"
          
          element={
            <AdminContact user={user} me={me} decodedToken={decodedToken} />
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
