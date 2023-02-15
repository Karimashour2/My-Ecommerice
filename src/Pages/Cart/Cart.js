import { Button } from "antd";
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import CartTable from "./CartTable";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { productsInCart, setProductsInCart } = useOutletContext();
  const totalPrice = () => {
    let total = 0;
    for (let i = 0; i < productsInCart.length; i++) {
      total += productsInCart[i].price;
    }
    return total;
  };

  const productsNames = productsInCart.map((p) => p.title);

  const elementCounts = {};

  productsNames.forEach((element) => {
    elementCounts[element] = (elementCounts[element] || 0) + 1;
  });

  const filteredCart = productsInCart.filter(
    (value, index, self) =>
      index ===
      self.findIndex((t) => t.id === value.id && t.title === value.title)
  );



  return (
    <div className="cart-container">
      <CartTable
        productsInCart={filteredCart}
        setProductsInCart={setProductsInCart}
        quantitys={elementCounts}
      />

      <div className="total-price-area">
        <p>{`  Total : ${totalPrice()} $`}</p>

        <Button
          className="checkout-btn z"
          onClick={() => navigate("/shop/checkout")}
          type="primary"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
