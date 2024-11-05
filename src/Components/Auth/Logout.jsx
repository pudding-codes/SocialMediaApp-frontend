// import React, {useState} from 'react';
// import Login from './Login';
// import toast from "react-hot-toast";

// const Logout = () => {
//     const [token, setToken] = useState('');
  
//     const handleLogout = () => {
//       setToken('');
//       toast.success('Logged out successfully!');
//     };
  
//     return (
//       <div>
//         {!token ? (
//           <Login setToken={setToken} />
//         ) : (
//           <div>
//             <h2>Welcome! You are logged in.</h2>
//             <button onClick={handleLogout}>Logout</button>
//           </div>
//         //   <Toaster/>
//         )}
//       </div>
//     );
//   };
  
//   export default Logout;