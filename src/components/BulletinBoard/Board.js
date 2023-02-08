import { useState } from "react";
import BoardPosts from "./BoardPosts";
import { Navigate, useNavigate } from "react-router-dom";
import "./Board.css";

export default function Board({ decodedToken }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [signal, setSignal] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const _id = decodedToken?._id;

  console.log("_id in board: ", _id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/board", {
        method: "POST",
        body: JSON.stringify({ title, content, user: _id, user_id: _id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      console.log("POST: ", data);

      if (!response.ok) {
        setError(data.error);
      }

      if (response.ok) {
        setError(null);
        setTitle("");
        setContent("");
        setSignal(true);
        alert("Your post has been submitted!");
      }
    } catch (error) {
      setError(error);
      alert("You suck at coding");
      console.log(error);
    }
  };

  return (
    <div className="Board">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <BoardPosts
        signal={signal}
        setSignal={setSignal}
        auth={user}
        decodedToken={decodedToken}
      />
      <button onClick={() => navigate(`/`)} className="backToMain">
        Back to main
      </button>
    </div>
  );
}
