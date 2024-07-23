import React from "react";
import Navbar from "../../components/Navbar/navbar.jsx";
import Category from "../../components/Category/category.jsx";
import Contents from "../../components/Contents/contents.jsx";
import Footer from "../../components/Footer/footer.jsx";
import Login from "../../components/Login/Login.jsx";
import AdFooter from "../../components/Footer/getAppFooter.jsx";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Category />
      <Login />
      <Contents />
      <AdFooter />
      <Footer />
    </div>
  );
};

export default Home;
