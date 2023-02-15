import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import { Avatar, Badge, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";
import "./HeaderC.css";

const HeaderC = ({
  setCollapsed,
  onSearch,
  onSearchHandle,
  collapsed,
  searchInput,
  productsInCart,
  currentUser,
}) => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header className="header" style={{ background: colorBgContainer }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      })}
      <Search
        className="search-bar"
        placeholder="search for products"
        allowClear
        onChange={onSearchHandle}
        value={searchInput}
      />

      <div className="header-items">
        <Button
          className="user-page-btn"
          type="text"
          onClick={() => navigate("/shop/user")}
        >
          <Avatar
            className="user-icon"
            size="30%"
            src={currentUser.userImage}
          />
          <p>{currentUser.userName}</p>
        </Button>
        <Badge className="cart-btn" count={productsInCart.length} onClick={() => navigate("cart")}>
          <ShoppingCartOutlined
            style={{ fontSize: "2em", color: "#001529", cursor: "pointer" }}
          />
        </Badge>
      </div>
    </Header>
  );
};

export default HeaderC;
