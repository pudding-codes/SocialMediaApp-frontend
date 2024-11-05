import React, { useState, useEffect } from "react";
import {
  fetchExploreUsers,
  followUser,
  unFollowUser,
} from "../../services/api";
import "./Explore.css";
export default function Explore() {
  const [users, setUsers] = useState([]);
  // const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchExploreUsers();
        console.log("response-data", response.data);
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const handleFollow = async (userId) => {
    try {
      await followUser(userId);
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isFollowing: true } : user
        )
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnFollow = async (userId) => {
    try {
      await unFollowUser(userId);
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isFollowing: false } : user
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="explore-container">
      <h1>Explore Users</h1>
      <ul className="user-list">
        {users?.map((user) => (
          <li key={user._id} className="user-item">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <p>Followers:{user.followers.length}</p>
            <p>Following:{user.following.length}</p>
            {user.isFollowing ? (
              <button
                className="unfollow-button"
                onClick={() => handleUnFollow(user._id)}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="follow-button"
                onClick={() => handleFollow(user._id)}
              >
                Follow
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
