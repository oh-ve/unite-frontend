import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import "../css/Board.css";
import BoardImg from "./post.jpg";

export default function OnePost({ user }) {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");
  const [signal, setSignal] = useState(false);
  const [reply, setReply] = useState();
  const link1 = "https://unite.onrender.com";
  const link2 = "http://localhost:8080";
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(link1 + `/board/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        setError(null);
        setPost(result.board);
      }

      if (!response.ok) {
        setError(result.error);
      }
    };
    fetchData();
  }, []);

  console.log("POST: ", post);

  let date = new Date(post?.date).toLocaleString();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(link1 + `/board/${id}/replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        content,
      }),
    });
    const result = await response.json();

    if (response.ok) {
      console.log("Reply added successfully");
      setContent("");
      setSignal(true);
    } else {
      console.error(result.error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(link1 + `/board/${id}/replies`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const result = await response.json();
      console.log("REPLY: ", reply);

      if (response.ok) {
        setError(null);
        setReply(result.replies.reverse());
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
  }, [content]);

  return (
    <div className="post-container">
      {post && (
        <div className="post">
          <p>{date}</p>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h2>Reply</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit Reply</button>
      </form>
      <div className="replies">
        {reply &&
          reply.map((rep) => {
            let repDate = new Date(rep.date).toLocaleString();
            return (
              <div className="reply">
                <p className="boardDate">{repDate}</p>
                <p id="boardText">{rep.content}</p>
              </div>
            );
          })}
      </div>

      <button onClick={() => navigate(`/board`)} className="backToMain">
        Back to board
      </button>
    </div>
  );
}
