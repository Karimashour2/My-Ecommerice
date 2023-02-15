import { Avatar, Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  LoginOutlined
} from "@ant-design/icons";
import "./SidebarC.css";

const SidebarC = ({ collapsed, current, currentUser }) => {
  const navigate = useNavigate();

  return (
    <Sider
      className="sidebar"
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
    >
      <div className="main-title">E-Commerce</div>

      <div className="user-info">
        <Avatar size={64} src={currentUser?.userImage} />
        <p>Welcome</p>
        <p>
          {currentUser?.userFirstName} {currentUser?.userLastName}
        </p>
      </div>

      <Menu
        className="nav-menu"
        theme="dark"
        mode="inline"
        onClick={({ key }) => {
          navigate(key);
        }}
        selectedKeys={current}
        items={[
          {
            className: "menu-item",
            key: "/shop/products",
            icon: <ShopOutlined />,
            label: "Products",
          },
          {
            className: "menu-item",
            key: "/shop/cart",
            icon: <ShoppingCartOutlined />,
            label: "Cart",
          },
          {
            className: "menu-item",
            key: "/shop/checkout",
            icon: <CheckCircleOutlined />,
            label: "Checkout",
          },
        ]}
      />
    {!collapsed?  <Button
        className="sign-out-btn"
        danger
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/");
        }}
      > 
        <LoginOutlined className="sign-out-icon"/>
      </Button> : null}
    </Sider>
  );
};

export default SidebarC;
