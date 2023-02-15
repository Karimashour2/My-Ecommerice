import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Carousel,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Row,
  Space,
} from "antd";
import "../SignIn/SignIn.css";
import img1 from "./assets/img1.png";
import img2 from "./assets/img2.png";
import img3 from "./assets/img3.png";
import signImg from "./assets/sign-in-bg.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const imgs = [img1, img2, img3];
const SignIn = () => {

  const navigate = useNavigate();
  const onSubmit=(values)=>{
    axios.post('https://dummyjson.com/auth/login', values).then((res)=> {
      localStorage.setItem('user',JSON.stringify({token: res.data.token,
        userImage: res.data.image,
        userFirstName: res.data.firstName,
        userLastName: res.data.lastName,
        userName: res.data.username,
        userId: res.data.id,
      }))
      message.success("logged in")
      navigate("/shop/products");
    })
  }
  return (
    <Row className="container" gutter={24} align={"top"} justify={"center"}>
      <Col xs={0} sm={12} md={14}>
        <Carousel autoplay effect="fade" dots={{ className: "dotsStyle" }}>
          {imgs.map((img, idx) => (
            <div key={idx} class={"img-container"}>
              <img src={img} alt="" width={"100%"} height="100%" />
            </div>
          ))}
        </Carousel>
      </Col>
      <Col xs={24} sm={12} md={10} className='form-col'>
        <h1>Welcome To Our E-Commerce Website</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            username: 'kminchelle',
            password: '0lelplR',
            remember: true,
          }}
          onFinish={onSubmit}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Space>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or
            <a href="">register now!</a>
          </Space>
        </Form>
      </Col>
      <img className="sign-in-background" src={signImg} alt="sign-in-background" />
    </Row>
  );
};

export default SignIn;
