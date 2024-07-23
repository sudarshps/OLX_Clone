import "./navbar.css";
import olxlogo from "/olx-logo-vector.svg";
import { ChevronDown, Search, PersonCircle } from "react-bootstrap-icons";
import React, { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContext.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout, db } from "../../../utils/firebase.js";
import { useNavigate } from "react-router-dom";

const navbar = () => {
  const [authUser, setAuthUser] = useState(false);
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");

  const handlePostPage = () => {
    if (authUser) {
      navigate("/post");
    } else {
      openModal();
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setDisplayName(user.displayName);
        setAuthUser(true);
      } else {
        setAuthUser(false);
      }
    });
  }, []);

  const { openModal } = useModal();

  return (
    <div className="navbar">
      <img src={olxlogo} alt="" />
      <div className="search-inputs">
        <div className="search-inputs-left">
          <div className="input-container">
            <Search className="search-location-icon" />
            <input type="text" placeholder="India" />
            <ChevronDown className="location-down-icon" />
          </div>
        </div>
        <div className="search-inputs-right">
          <div>
            <input
              type="text"
              placeholder="Find Cars,Mobile Phones and more..."
            />
          </div>
          <div className="search-icon-div">
            <Search color="white" className="search-icon" />
          </div>
        </div>
      </div>
      <div className="dropdown">
        <button
          className="dropdown-toggle"
          style={{
            border: "none",
            outline: 0,
            backgroundColor: "transparent",
            fontWeight: 500,
          }}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          ENGLISH
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#">
              ENGLISH
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              हिंदी
            </a>
          </li>
        </ul>
      </div>

      <div className="nav-right">
        {authUser ? (
          <div className="nav-prof">
            <PersonCircle className="profile-logo" />

            <div className="drop">
              <h6>Hi,{displayName}</h6>
              <p onClick={()=>navigate('/ads')}>My Ads</p>
              <p>Settings</p>
              <p onClick={logout}>Logout</p>
            </div>
          </div>
        ) : (
          <h3 onClick={openModal}>Login</h3>
        )}
        <button onClick={handlePostPage}>
          <span className="plus-sell">+</span>SELL
        </button>
      </div>
    </div>
  );
};

export default navbar;
