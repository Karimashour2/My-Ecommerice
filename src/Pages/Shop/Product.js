import { Card, Tooltip } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Hover from "./Hover";
import "./Product.css";
import axios from "axios";

const Product = ({ product, i, setProductsInCart, setSingleProduct }) => {
  const [hover, setHover] = useState(-1);
  const navigate = useNavigate()
  const showProductHover = (i) => {
    setHover(i);
  };
  const hideProductHover = () => {
    setHover(-1);
  };

  let {id} = useParams()
  id = product.id
  return (
    <Card
      onMouseLeave={hideProductHover}
      onMouseEnter={() => showProductHover(i)}
      className="card product-container"
      onClick={()=> {
        axios.get(`https://dummyjson.com/products/${product?.id}`)
          .then((res)=> {
            setSingleProduct(res.data)
            });
        navigate(`../product/${id}`);
        }}
      cover={
        <img
          className="product-image"
          alt={product.title}
          src={product.thumbnail}
        />
      }
    >
      {hover === i && (
        <Hover product={product} i={i} setProductsInCart={setProductsInCart} />
      )}

      <p className="product-price">
        {`$ ${product.price}`}
      </p>
      
      <p className="product-title">
        {product.title}
      </p>

      <Tooltip 
        title={product.description}              placement="bottom">
          <p className="product-description">
            {product.description}
          </p>
      </Tooltip>
      
    </Card>
  );
};

export default Product;
