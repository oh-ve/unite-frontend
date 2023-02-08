import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

export default function BoardPosts({ signal, setSignal, decodedToken }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [allPosts, setAllPosts] = useState(true);
  const navigate = useNavigate();

  const _id = decodedToken?._id;

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/board", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        setError(null);
        setPosts(result.boards.reverse());
      }

      if (!response.ok) {
        alert("You suck at coding, bitch");
        setError(result.error);
      }
    };
    fetchData();
  }, [signal]);

  useEffect(() => {
    setSignal(false);
  }, [posts]);

  console.log("Posts: ", posts);
  return (
    <div className="BoardPosts">
      <button onClick={() => setAllPosts(true)}>All posts</button>
      <button onClick={() => setAllPosts(false)}>My posts</button>
      <div id="BoardPosts">
        {posts &&
          posts
            .filter((post) => (allPosts ? true : post.user_id === _id))
            .map((post) => {
              let date = new Date(post.date).toLocaleString();
              return (
                <Link to={`/board/${post._id}`} key={post._id}>
                  <div>
                    <p className="boardDate">{date}</p>
                    <h3>{post.title}</h3>
                  </div>
                </Link>
              );
            })}
        <button onClick={() => navigate(`/`)} className="boardBack">
          Back to main
        </button>
      </div>
    </div>
  );
}
