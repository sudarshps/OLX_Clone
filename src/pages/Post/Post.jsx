import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import "./Post.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/footer.jsx";
import { imageDb, auth, post } from "../../../utils/firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Post = () => {
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [titleError, setTitleError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageError, setImageError] = useState("");

  const handleSubmit = async () => {
    setTitleError(!title.trim() ? "Title is required" : "");
    setCategoryError(!category.trim() ? "Category is required" : "");
    setPriceError(!price.trim() ? "Price is required" : "");
    setImageError(!image ? "Please select an image" : "");

    if (!title.trim() || !category.trim() || !price.trim() || !image) {
      return;
    }

    const validImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];
    if (!validImageTypes.includes(image.type)) {
      alert("Invalid file type. Only JPEG, PNG, and WEBP are allowed.");
      return;
    }

    try {
      const imgRef = ref(imageDb, `image/${image.name}`);
      await uploadBytes(imgRef, image);

      const url = await getDownloadURL(imgRef);

      post(title, category, price, url, auth.currentUser.uid);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="back-btn-div">
        <ArrowLeft className="arrow-left" onClick={() => navigate("/")} />
      </div>
      <div className="category-div1">
        <h3>POST YOUR AD</h3>
      </div>
      <div className="main-ctg-div">
        <h5>INCLUDE SOME DETAILS</h5>
        <hr />
        <div className="form-div">
          <>
            <label htmlFor="title">
              Ad Title <span>*</span>
            </label>
            <br />
            <input
              type="text"
              className="inputAd"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() =>
                setTitleError(title.trim() ? "" : "Title is required!")
              }
            />
            {titleError && <span style={{ color: "red" }}>{titleError}</span>}

            <br />
            <label htmlFor="category">
              Category<span>*</span>
            </label>
            <br />
            <input
              type="text"
              className="inputAd"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onBlur={() =>
                setCategoryError(category.trim() ? "" : "Category is required!")
              }
            />
            {categoryError && (
              <span style={{ color: "red" }}>{categoryError}</span>
            )}

            <br />
            <label htmlFor="price">
              Price<span>*</span>
            </label>
            <br />
            <input
              type="number"
              className="inputAd"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={() => setPriceError(price ? "" : "Price is required!")}
            />
            {priceError && <span style={{ color: "red" }}>{priceError}</span>}
            <br />
            <label htmlFor="image">
              Photo<span>*</span>
            </label>
            <br />
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .webp"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </>
        </div>
        {imageError && <span style={{ color: "red" }}>{imageError}</span>}
        <hr />
        <button className="btn btn-warning" onClick={handleSubmit}>
          POST NOW
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Post;
