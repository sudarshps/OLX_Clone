import React from "react";
import { ChevronDown } from "react-bootstrap-icons";
import "./category.css";

const category = () => {
  return (
    <div className="category-div">
      <div className="category-drop">
        <p>ALL CATEGORIES</p>
        <ChevronDown className="arrow-down"/>
      </div>
      <div className="category-list">
            <ul>
                <li>Cars</li>
                <li>Motorcycles</li>
                <li>Mobile Phones</li>
                <li>For Sale: Houses & Apartments</li>
                <li>Scooters</li>
                <li>Commercial & Other Vehicles</li>
                <li>For Rent: Houses & Apartments</li>
            </ul>
      </div>
    </div>
  );
};

export default category;
