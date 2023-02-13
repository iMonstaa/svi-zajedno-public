import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Social from "./pages/Social";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/app/Dashboard";
import Login from "./pages/app/Login";
import Post from "./pages/app/Post";
import NewPost from "./pages/app/NewPost";
import Profile from "./pages/app/Profile";
import Register from "./pages/app/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Feed from "./pages/app/Feed";
import PinPost from "./pages/app/PinPost";
import { AuthContextProvider } from "./context/AuthContext";
import "./styles/_main.scss";
import "react-toastify/scss/main.scss";
import ReciklazAI from "./pages/app/ReciklazAI";

import { ToastContainer } from "react-toastify";

function App() {
  const [count, setCount] = useState(0);
  //prettier-ignore
  return (
    //need a navigate
    <AuthContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        // limit={1}
      />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
          <Route path="/app">
            <Route index element={<ProtectedRoute><Social><Feed/></Social></ProtectedRoute>}/>
            <Route path="profile" element={<ProtectedRoute><Social><Profile/></Social></ProtectedRoute>}/>
            <Route path="reciklazai" element={<ProtectedRoute><Social><ReciklazAI/></Social></ProtectedRoute>}/>
            <Route path="dashboard" element={<ProtectedRoute><Social><Dashboard/></Social></ProtectedRoute>}/>
            <Route path="post/new" element={<ProtectedRoute><Social><NewPost/></Social></ProtectedRoute>}/>
            <Route path="post/:id" element={<ProtectedRoute><Social><Post/></Social></ProtectedRoute>}/>
            <Route path="pin/:id" element={<ProtectedRoute><Social><PinPost/></Social></ProtectedRoute>}/>
          </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
