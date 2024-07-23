import React, { useContext, useEffect, useState } from "react";
import "./MyAds.css";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../../utils/firebase.js";
import { PostContext } from "../../context/postContext";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const MyAds = () => {
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const matchQuery = query(
          collection(db, "products"),
          where("userId", "==", userId)
        );
        const postsSnapshot = await getDocs(matchQuery);
        const productsList = postsSnapshot.docs.map((product) => ({
          id: product.id,
          ...product.data(),
        }));
        setProducts(productsList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId("");
      }
    });
  }, []);

  const handleDelete = async (productId) => {
    try {
      const docRef = doc(db, "products", productId);
      await deleteDoc(docRef);
      alert("ad deleted!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (product) => {
    navigate("/editProduct", { state: { product } });
  };

  return (
    <div className="contents-div">
      <p>My Ads</p>
      {products.map((product, index) => (
        <div className="contents1-div">
          <div
            className="card-content-div"
            key={index}
            onClick={() => {
              setPostDetails(product);
              navigate("/view");
            }}
          >
            <div className="card" style={{ width: "18rem" }} key={index}>
              <img src={product.url} className="card-img-top" alt="..." />
              <div className="card-body">
                <h4>₹ {product.price}</h4>
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.category}</p>
              </div>
            </div>
          </div>
          <div className="action-div">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => handleEdit(product)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAds;
