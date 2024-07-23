import React, { useEffect } from "react";
import Home from "./pages/Home/Home.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import Post from "./pages/Post/Post.jsx";
import View from "./pages/View/view.jsx";
import MyAds from './pages/MyAds/MyAds.jsx'
import EditProduct from './pages/EditProduct/EditProduct.jsx'
import PostContext from "./context/postContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
      <ModalProvider>
        <PostContext>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="/view" element={<View />} />
            <Route path="/ads" element={<MyAds/>}/>
            <Route path="/editProduct" element={<EditProduct/>}/>
          </Routes>
        </PostContext>
      </ModalProvider>
    </div>
  );
};

export default App;
