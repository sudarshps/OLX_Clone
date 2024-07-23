import React, { useContext, useEffect, useState } from "react";
import "./contents.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { PostContext } from "../../context/postContext";
import { useNavigate } from "react-router-dom";

const contents = () => {
    const [products,setProducts] = useState([])
    const {setPostDetails} = useContext(PostContext)
    const navigate = useNavigate()

    useEffect(()=>{
      const fetchPosts = async()=>{
        try {
          const postsSnapshot = await getDocs(collection(db,'products'))
          const productsList = postsSnapshot.docs.map(product=>({id:product.id,...product.data()}))
          setProducts(productsList)
        } catch (error) {
          console.log(error);
        }
      }
      fetchPosts()
    },[])
  return (
    <div className="contents-div">
      <p>Fresh recommendations</p>
      {products.map((product,index) => (
        <div className="card-content-div" key={index} onClick={()=>{
          setPostDetails(product)
          navigate('/view')
        }}>
                 <div className="card" style={{ width: '18rem' }} key={index}>
          <img src={product.url} className="card-img-top" alt="..." />
          <div className="card-body">
            <h4>₹ {product.price}</h4>
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">
              {product.category}
            </p>
          </div>
        </div>
        </div>
       
      ))}
    
      
    </div>
  );
};

export default contents;
