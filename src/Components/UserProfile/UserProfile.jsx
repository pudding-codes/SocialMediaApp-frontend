import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { useParams } from "react-router-dom";
import { fetchUserById, unFollowUser, followUser } from "../../services/api";

export default function UserProfile() {
  const { userId } = useParams();
  console.log("userId",userId)

  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchUserById(userId);
        console.log("====>",response)
        setUser(response.data);
        console.log(response.data);
        setIsFollowing(
          response.data.followers.includes(localStorage.getItem("userId"))
        );
      } catch (e) {
        console.log(e);
      }
    };
    if (userId) {
      fetchUser(); // Only fetch if userId is defined
    }
  }, [userId]);

  console.log("userId", userId);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const handleUnFollow = async () => {
    try {
      await unFollowUser(userId);
      setIsFollowing(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFollow = async () => {
    try {
      await followUser(userId);
      setIsFollowing(true);
    } catch (e) {
      console.log(e);
    }
  };
  if (!user) {
    return <h1 className="Loading">Loading...</h1>;
  }

  return (
    <div className="user-profile-container">
      <h1>{user?.username}</h1>
      <p>{user?.email}</p>
      {isFollowing ? (
        <button
          className="user-profile-button"
          onClick={() => handleUnFollow()}
        >
          Unfollow
        </button>
      ) : (
        <button className="user-profile-button" onClick={() => handleFollow()}>
          Follow
        </button>
      )}
      <button className="user-profile-logout" onClick={() => handleLogout()}>
        Logout
      </button>
    </div>
  );
}
