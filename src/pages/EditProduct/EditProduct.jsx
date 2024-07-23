import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import "./EditProduct.css";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/footer.jsx";
import { imageDb, auth, editPost } from "../../../utils/firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EditProduct = () => {
  const location = useLocation();
  const { product } = location.state;

  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState(product.title);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);

  const [titleError, setTitleError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [priceError, setPriceError] = useState("");

  const handleSubmit = async () => {
    setTitleError(!title.trim() ? "Title is required" : "");
    setCategoryError(!category.trim() ? "Category is required" : "");
    setPriceError(!price.trim() ? "Price is required" : "");

    if (!title.trim() || !category.trim() || !price.trim()) {
      return;
    }

    if (image) {
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
    }

    try {
      let isImage;
      if (image) {
        isImage = true;
        const imgRef = ref(imageDb, `image/${image.name}`);
        await uploadBytes(imgRef, image);

        const url = await getDownloadURL(imgRef);

        await editPost(
          product.id,
          title,
          category,
          price,
          url,
          auth.currentUser.uid,
          isImage
        );
        navigate("/");
      } else {
        isImage = false;
        await editPost(
          product.id,
          title,
          category,
          price,
          auth.currentUser.uid,
          isImage
        );
        navigate("/");
      }
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
        <h3>EDIT YOUR AD</h3>
      </div>
      <div className="main-ctg-div">
        <h5>INCLUDE DETAILS</h5>
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
            <label htmlFor="image">Photo</label>
            <br />
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .webp"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </>
          <img src={image} alt="" style={{ height: 50, width: 100 }} />
        </div>
        <hr />
        <button className="btn btn-warning" onClick={handleSubmit}>
          POST NOW
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default EditProduct;
