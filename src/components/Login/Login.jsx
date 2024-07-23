import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useModal } from "../../context/ModalContext.jsx";
import "./Login.css";
import { XLg } from "react-bootstrap-icons";
import { login, signUp } from "../../../utils/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../utils/firebase.js";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    height: "100%",
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    outline: "none",
    padding: "20px",
    zIndex: 1001,
  },
};

const Login = () => {
  const { isModalOpen, closeModal } = useModal();
  const [signState, setSignstate] = useState("Sign In");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let modal = isModalOpen;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        closeModal();
      }
    });
  }, []);

  const user_auth = async (e) => {
    e.preventDefault();
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signUp(username, email, password);
    }
  };

  return (
    <Modal
      isOpen={modal}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <XLg onClick={closeModal} className="close-icon" />

      <div className="main-div">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" ? (
            <>
              <label htmlFor="fname">Username</label>
              <br />
              <input
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
            </>
          ) : null}

          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{signState}</button>
        </form>

        {signState === "Sign In" ? (
          <p>
            Don't have an account?
            <span onClick={() => setSignstate("Sign Up")}>Sign Up</span>
          </p>
        ) : (
          <p>
            have an account?
            <span onClick={() => setSignstate("Sign In")}>Sign In</span>
          </p>
        )}
      </div>
    </Modal>
  );
};

export default Login;
