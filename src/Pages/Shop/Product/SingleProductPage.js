import { Badge, Button, Descriptions, Image } from "antd";
import React from "react";
import { useOutletContext } from "react-router-dom";
import "./SingleProductPage.css";

const SingleProductPage = () => {
  const { singleProduct, setProductsInCart } = useOutletContext();
  const discount = (100 - singleProduct?.discountPercentage) / 100;

  return (
    <div className="product-details-container">
      <Image
        className="prod-main-img"
        width={200}
        height={200}
        src={singleProduct?.thumbnail}
      />
      <Descriptions bordered className="product-details" column={1}>
        <Descriptions.Item label="Product">
          {singleProduct?.title}
        </Descriptions.Item>
        <Descriptions.Item label="Brand">
          {singleProduct?.brand}
        </Descriptions.Item>
        <Descriptions.Item label="Category">
          {singleProduct?.category}
        </Descriptions.Item>
        <Descriptions.Item label="Product Images">
          <div className="images-container">
            {singleProduct?.images?.map((img, i) => (
              <Image
                width={100}
                key={i}
                className="prod-img"
                src={img}
                alt={singleProduct?.title}
              />
            ))}
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {singleProduct?.description}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Badge
            color={"green"}
            status="processing"
            text={`Available ${singleProduct?.stock} In Stock`}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Price">
          <span className="prod-price">{singleProduct?.price + " $"}</span>
          <span className="prod-final-price">
            {(singleProduct?.price * discount).toFixed(2) + " $"}
          </span>
        </Descriptions.Item>
      </Descriptions>
      <Button
        type="primary"
        className="add-to-cart-btn"
        block
        onClick={(e) => {
          setProductsInCart((prev) => [...prev, singleProduct]);
        }}
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default SingleProductPage;
