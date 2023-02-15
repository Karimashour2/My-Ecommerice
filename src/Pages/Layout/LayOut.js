import React, { useState } from "react";
import { Breadcrumb, Layout, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import SidebarC from "./SidebarC";
import HeaderC from "./HeaderC";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect } from "react";
import './LayOut.css';
import './HeaderC.css';

const currentUser= JSON.parse(localStorage.getItem('user'))

const LayOut = () => {
  const [searchInput, setSearchInput] = useState("");
  const [collapsed, setCollapsed] = useState(true);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [singleProduct, setSingleProduct]=useState();
  const [productsInCart, setProductsInCart] = useState([
  
  ]);

  const router = useLocation()
  const [current, setCurrent] = useState(router.pathname);

  
  useEffect ( () => {
    setCurrent(router.pathname)
  }, [router.pathname])


  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onSearchHandle = (e) => {
    setSearchInput(e.target.value);
    axios
      .get(`https://dummyjson.com/products/search?q=${e.target.value}`)
      .then((res) => {
        setSearchedProducts(res.data.products);
      });
  };


  return (
    <Layout className="layout" >

      <SidebarC
        collapsed={collapsed}
        current={current}
        currentUser={currentUser}
      />

      <Layout 
        className="site-layout">
        <HeaderC
          productsInCart={productsInCart}
          setCollapsed={setCollapsed}
          onSearchHandle={onSearchHandle}
          collapsed={collapsed}
          searchInput={searchInput}
          currentUser={currentUser}
        />
        
        <Breadcrumb 
        className="breadcrumb-container"
        >
          <Breadcrumb.Item style={{ fontSize: "1.875rem", color: "#464d69" }}>
          / <span style={{textTransform: 'capitalize'}}>{current.slice(6)}</span>
          </Breadcrumb.Item>
        </Breadcrumb>
        
        <Content
          className='content'
          style={{background: colorBgContainer}}
        >
          <Outlet
            context={{
              searchInput: searchInput,
              searchedProducts: searchedProducts,
              productsInCart: productsInCart,
              setProductsInCart: setProductsInCart,
              currentUser: currentUser,
              collapsed: collapsed,
              singleProduct: singleProduct, 
              setSingleProduct: setSingleProduct,
              
            }}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayOut;
