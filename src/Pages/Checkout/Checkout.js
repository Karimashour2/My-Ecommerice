import { Button, Col, Descriptions, InputNumber, Row, Table, Tabs } from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./Checkout.css";
import { UserOutlined, PayCircleOutlined } from "@ant-design/icons";
import { useRef } from "react";

const columns = [
  {
    title: "Product",
    className: "product",
    dataIndex: "Product",
    width: "45%",
  },
  {
    title: "Quantity",
    className: "quantity",
    dataIndex: "Quantity",
    width: "10%",
  },
  {
    title: "Price",
    className: "price",
    dataIndex: "Price",
    width: "20%",
  },
];

const Checkout = () => {
  const [userinfo, setUserInfo] = useState([]);
  const { currentUser, productsInCart, collapsed } = useOutletContext();

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users/${currentUser.userId}`)
      .then((res) => {
        setUserInfo(res.data);
      });
  }, [currentUser.userId]);

  const navigate = useNavigate()

  const formRef = useRef(null);
  useEffect(() => {
    formRef.current?.resetFields();
  }, [userinfo]);


  const productsNames= productsInCart.map((p)=> p.title)

  const elementCounts = {};

  productsNames.forEach(element => {
    elementCounts[element] = (elementCounts[element] || 0) + 1;
  });




const filteredCart = productsInCart.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.id === value.id && t.title=== value.title
  ))
)


  const data = filteredCart.map((p, i) => {
    p.quantity=elementCounts[p.title]
    return {
      Product: (
        <div className="product-info" key={p.title + i}>
          <img className={collapsed? 'show-product-image' : 'product-image'} key={"img" + i} src={p.thumbnail} alt={p.title} />
          <p key={"product" + i}>{p.title}</p>
        </div>
      ),
      Quantity: (
        <InputNumber
          disabled
          key={"quantity" + i}
          className="quantity-number"
          defaultValue={p.quantity}
        />
      ),
      Price: <p key={"price" + i}>{p.price + " $"}</p>,
    };
  });

  const totalPrice = () => {
    let total = 0;
    for (let i = 0; i < productsInCart.length; i++) {
      total += productsInCart[i].price;
    }
    return total;
  };

  const shipping = 20;
  const tax = Number((totalPrice() * 0.14).toFixed(2));
  const total = (tax + shipping + totalPrice()).toFixed(2);
  

  return (
    <Row gutter={24} className="chechout-container">
      <Col className="user-data-area" span={15} xs={22}>
        <Tabs
          className="user-tabs"
          defaultActiveKey="2"
          items={[
            {
              key: 1,
              label: (
                <p>
                  <UserOutlined />
                  Billing Address
                </p>
              ),
              children: (
                <Descriptions title="User Info" layout="horizontal" column={{md:2, xs:1}}>
                  <Descriptions.Item label="First Name">
                    {userinfo?.firstName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Last Name">
                    {userinfo?.lastName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Mobile No.">
                    {userinfo?.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="E-mail">
                    {userinfo?.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address">
                    {userinfo?.address?.address +
                      ", " +
                      userinfo?.address?.city +
                      ", " +
                      userinfo?.address?.state}
                  </Descriptions.Item>
                  <Descriptions.Item label="Postal Code">
                    {userinfo?.address?.postalCode}
                  </Descriptions.Item>
                </Descriptions>
              ),
            },
            {
              key: 2,
              label: (
                <p>
                  <PayCircleOutlined />
                  Payment
                </p>
              ),
              children: (
                <Descriptions
                  title="Payment Info"
                  layout="horizontal"
                  column={1}
                >
                  <Descriptions.Item label="Card Name">
                    {userinfo?.firstName + " " + userinfo?.lastName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Card Number">
                    {userinfo?.bank?.cardNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Card Type">
                    {userinfo?.bank?.cardType.toUpperCase()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Expire Date" span={2}>
                    {userinfo?.bank?.cardExpire}
                  </Descriptions.Item>
                </Descriptions>
              ),
            },
          ]}
        />
      </Col>
      <Col className="confirmed-products" span={8} xs={22}>
        <Table
          className="cart-table"
          pagination={{
            defaultPageSize: 4,
            className: "table-pag",
            hideOnSinglePage: true,
          }}
          columns={columns}
          dataSource={data}
          size="small"
          rowClassName="table-row"
        />
        <Descriptions column={1}>
          <Descriptions.Item label="Subtotal" className="desc-item">
            {totalPrice() + " $"}
          </Descriptions.Item>
          <Descriptions.Item className="desc-item" label="Shipping">
            {shipping + " $"}
          </Descriptions.Item>
          <Descriptions.Item className="desc-item" label="Tax">
            {tax + " $"}
          </Descriptions.Item>
          <Descriptions.Item className="desc-item" label="Total">
            {total + " $"}
          </Descriptions.Item>
        </Descriptions>
      </Col>
      <Button className="place-oreder-btn" type="primary" onClick={()=> {
        filteredCart.length !== 0 ? navigate('/result-success') : navigate('/result-failed')
      }}>
          Place Order
        </Button>
    </Row>
  );
};

export default Checkout;
