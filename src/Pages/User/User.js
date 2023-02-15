import { DatePicker, Tabs } from "antd";
import React, { useRef } from "react";
import dayjs from "dayjs";
import {
  UserOutlined,
  PayCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import "./User.css";

const User = () => {
  const [userinfo, setUserInfo] = useState([]);
  const { currentUser } = useOutletContext();

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users/${currentUser.userId}`)
      .then((res) => {
        setUserInfo(res.data);
      });
  }, [currentUser.userId]);

  const formRef = useRef(null);
  useEffect(() => {
    formRef.current?.resetFields();
  }, [userinfo]);

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const layout1 = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  const onFinish = (values) => {
    axios
      .put(`https://dummyjson.com/users/${currentUser.userId}`, values)
      .then((res) => console.log(res.data));
  };

  const dateFormat = "YYYY-MM-DD";

  return (
    <div className="user-info-container">
      <Tabs
        className="user-tabs"
        defaultActiveKey="2"
        items={[
          {
            className: "tab-info",
            key: 1,
            label: (
              <p>
                <UserOutlined />
                My Profile
              </p>
            ),
            children: (
              <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                initialValues={{
                  firstname: userinfo?.firstName,
                  lastname: userinfo?.lastName,
                  email: userinfo?.email,
                  username: userinfo?.username,
                  date: dayjs(userinfo?.birthDate, dateFormat),
                }}
                style={{
                  maxWidth: 600,
                }}
                validateMessages={validateMessages}
                ref={formRef}
              >
                <Form.Item name="firstname" label="First Name">
                  <Input />
                </Form.Item>
                <Form.Item name="lastname" label="Last Name">
                  <Input />
                </Form.Item>
                <Form.Item name="username" label="Username">
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="date"
                  label="Date Of Birth"
                  rules={[
                    {
                      type: "date",
                    },
                  ]}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 1,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
          {
            className: "tab-info",
            key: 2,
            label: (
              <p>
                <PayCircleOutlined />
                Payment Info.
              </p>
            ),
            children: (
              <Form
                ref={formRef}
                {...layout1}
                initialValues={{
                  cardName: userinfo?.firstName + " " + userinfo?.lastName,
                  cardnumber: userinfo?.bank?.cardNumber,
                  cardType: userinfo?.bank?.cardType,
                  cardExpire: userinfo?.bank?.cardExpire,
                }}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                  maxWidth: 600,
                }}
                validateMessages={validateMessages}
              >
                <Form.Item name="cardName" label="Card Name">
                  <Input />
                </Form.Item>
                <Form.Item name="cardnumber" label="Card Number">
                  <Input />
                </Form.Item>
                <Form.Item name="cardType" label="Card Type">
                  <Input />
                </Form.Item>
                <Form.Item name="cardExpire" label="Card Expire Date">
                  <Input />
                </Form.Item>
                <Form.Item
                  wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 1,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
          {
            className: "tab-info",
            key: 3,
            label: (
              <p>
                <HomeOutlined />
                Address
              </p>
            ),
            children: (
              <Form
                ref={formRef}
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                  maxWidth: 600,
                }}
                validateMessages={validateMessages}
                initialValues={{
                  address: userinfo?.address?.address,
                  city: userinfo?.address?.city,
                  coordinates:
                    userinfo?.address?.coordinates.lat +
                    " , " +
                    userinfo?.address?.coordinates.lng,
                  postalcode: userinfo?.address?.postalCode,
                  state: userinfo?.address?.state,
                }}
              >
                <Form.Item name="address" label="Address">
                  <Input />
                </Form.Item>
                <Form.Item name="city" label="City">
                  <Input />
                </Form.Item>
                <Form.Item name="coordinates" label="Coordinates">
                  <Input />
                </Form.Item>
                <Form.Item name="postalcode" label="Postal Code">
                  <Input />
                </Form.Item>
                <Form.Item name="state" label="State">
                  <Input />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 1,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
        ]}
      />
    </div>
  );
};

export default User;
