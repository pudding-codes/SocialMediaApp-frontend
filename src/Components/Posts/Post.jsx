import React from "react";
import { likePost, commentOnPost } from "../../services/api";
import './Post.css';

export default function Post({ post }) {
  const handleComment = async (e) => {
    e.preventDefault();
    const content = e.target.elements.comment.value;
    console.log("content", content);
    try {
      await commentOnPost(post._id, { content });
      e.target.elements.comment.value = "";
      alert("Commnet added successfully!");
    } catch (e) {
      console.log(e);
    }
  };

  const handleLike = async () => {
    try {
      await likePost(post._id);
      alert("Liked successfully!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="post-container">
      <p className="post-content">{post.content}</p>
      <button className="post-like-button" onClick={handleLike}>
        {post.like?.length}Like
      </button>
      <form onSubmit={handleComment} className="form-style">
        <input
          type="text"
          name="comment"
          placeholder="Add the comment"
          className="post-comment-input"
        />
        <button className="post-comment-buttton" type="submit">
          Comment
        </button>
        <div className="post-comments">
          {post.comments.map((comment) => (
            <div key={comment.id} className="post-comment">
              {/* <p>{comment.user.username}</p> */}
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
