import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import './Home.css'

const Home=()=>{
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <div className="home-container">
      <div>
       <h1 className="home-heading">Welcome to ClothingBrand</h1>
       <p className="home-paragraph">Shop the latest fashion for men, women, and kids.</p>
        <Link to="/products" className="shop-now-btn">
        Shop Now
      </Link>
      </div>
      <div>
      <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png' alt='home-image' className="home-image-icon"/>
      </div>
    </div>
  )
}

export default Home