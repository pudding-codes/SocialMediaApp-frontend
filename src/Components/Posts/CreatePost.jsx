import React, { useState } from "react";
import "./CreatePost.css";

import { createPost } from "../../services/api";

export default function CreatePost() {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createPost({ content:content });
      console.log("content", content);
      setContent("");
      //   alert("Post has been created successfully");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="create-post-container">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <textarea
          name="content"
          value={content}
          className="create-post-textarea"
          onChange={handleChange}
          placeholder="what`s on your mind"
        ></textarea>
        <button className="create-post-button" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}
