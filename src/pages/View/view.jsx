import React, { useContext, useEffect, useState } from "react";
import "./view.css";
import { PostContext } from "../../context/postContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { PersonCircle } from "react-bootstrap-icons";
import Navbar from '../../components/Navbar/navbar.jsx'
import Category from "../../components/Category/category";
import Footer from '../../components/Footer/footer.jsx'
import Login from '../../components/Login/Login.jsx'

const view = () => {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { userId } = postDetails;
        const matchQuery = query(
          collection(db, "user"),
          where("uid", "==", userId)
        );
        const querySnapshot = await getDocs(matchQuery);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (postDetails.userId) {
      fetchDetails();
    }
  }, [postDetails]);

  return (
    <>
     <Navbar/>
     <Category/>
     <Login/>
    <div className="container-fluid d-flex flex-column view-div">
      <div className="row d-flex justify-content-center">
        <div className="col-7 img-div">
          <img
            src={postDetails.url}
            alt="iPhone 12 phone"
            className="img-fluid"
          />
        </div>

        <div className="col-5 price-div">
          <div className="row mb-3 pdr1">
            <div className="col d-flex flex-column align-items-start">
              <h1>₹ {postDetails.price}</h1>
              <p>{postDetails.title}</p>
            </div>
          </div>
          <div className="row pdr2">
            <div className="col justify-content-between">
              {userDetails && (
                <div className="user-view-div">
                    <PersonCircle className="user-view-icon"/><h3>{userDetails.displayName}</h3>
                </div>
              )}

              <button type="button" className="btn btn-primary">
                Chat with seller
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <Footer/>
    </>
   
  );
};

export default view;
