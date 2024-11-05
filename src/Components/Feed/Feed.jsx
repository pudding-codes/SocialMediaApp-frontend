import React, { useState, useEffect } from "react";
import "./Feed.css";
import { fetchPosts } from "../../services/api";

import Post from "../Posts/Post";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await fetchPosts();
        setPosts(data);
        console.log("Data", data);
      } catch (e) {
        console.error(e);
      }
    };
    getPosts();
  },[posts]);

  return (
    <div className="feed-container">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}
