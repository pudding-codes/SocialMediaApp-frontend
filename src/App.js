import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Explore from "./Components/Explore/Explore.jsx";
import Login from "./Components/Auth/Login.jsx";
import Register from "./Components/Auth/Register.jsx";
import UserProfile from "./Components/UserProfile/UserProfile.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Feed from "./Components/Feed/Feed.jsx";
import CreatePost from "./Components/Posts/CreatePost.jsx";
import Post from "./Components/Posts/Post.jsx";
import { AuthProvider } from "./AuthContext";
import ProtectedLayout from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route element={<ProtectedLayout />}> */}
              <Route path="/explore" element={<Explore />} />
              <Route path="/user/:userId" element={<UserProfile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/post" element={<Post />} />
            {/* </Route> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
