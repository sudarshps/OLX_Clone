import React from "react";
import "./footer.css";


const footer = () => {
  return (
    <>

      <div className="main-footer">
        <div className="footer-section">
          <p>POPULAR LOCATIONS</p>
          <ul>
            <li>Kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>

        <div className="footer-section">
          <p>TRENDING LOCATIONS</p>
          <ul>
            <li>Bhubaneshwar</li>
            <li>Hyderabad</li>
            <li>Chandigarh</li>
            <li>Nashik</li>
          </ul>
        </div>

        <div className="footer-section">
          <p>ABOUT US</p>
          <ul>
            <li>Contact Us</li>
            <li>Tech@OLX</li>
          </ul>
        </div>

        <div className="footer-section">
          <p>OLX</p>
          <ul>
            <li>Blog</li>
            <li>Help</li>
            <li>Sitemap</li>
            <li>Legal & Privacy Information</li>
            <li>Vulnerability Disclosure Program</li>
          </ul>
        </div>

        <div className="footer-section">
          <p>FOLLOW US</p>
          
        </div>
      </div>
    </>
  );
};

export default footer;
