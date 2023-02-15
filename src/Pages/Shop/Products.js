import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import "./Shop.css";
import Product from "./Product";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import Sorter from "./Sorter";
import "./Products.css";
import Filter from "./Filter";
import FilterSmall from "./FilterSmall";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [page, setPage] = useState(0);
  const [onSortSelect, setOnSortSelect] = useState("Featured");
  const [categorized, setCategorized] = useState([]);
  ///////////////////////////////////////////////////////////////////
  const [brandized, setBrandized] = useState([]);
  const [bAndC, setBandC] = useState([]);

  // Getting Products data for pagination
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products", {
        params: { limit: 9, skip: page * 9 },
      })
      .then((res) => {
        setProducts((prev) => [...prev, ...res.data.products]);
      });
  }, [page]);

  // Getting All Products to export their Brands and Categories
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products", { params: { limit: 100 } })
      .then((res) => {
        setAllProducts(res.data.products);
        const productsBrand = res.data.products.map((product) =>
          product.brand.toLowerCase()
        );
        setBrands([...new Set(productsBrand)]);
      });
    axios
      .get("https://dummyjson.com/products/categories", {
        params: { limit: 100 },
      })
      .then((res) => setCategories(res.data));
  }, []);

  const { searchInput, searchedProducts, productsInCart, setProductsInCart, singleProduct, setSingleProduct } =
    useOutletContext();

  // Adding selected Category into Array and removing it if unselected
  const onCheckedCategory = (e, name) => {
    if (e.target.checked) {
      axios
        .get(`https://dummyjson.com/products/category/${name}`)
        .then((res) => setCategorized((prev) => [...prev, res.data.products]));
      setSelectedCategory((prevState) => [...prevState, name]);
    } else {
      setSelectedCategory((prev) =>
        prev.filter((category) => name !== category)
      );
      setCategorized((prev) =>
        prev.flat(1).filter((el) => el.category !== name)
      );
    }
  };

  // Adding selected Brand into Array and removing it if unselected
  const onCheckedBrand = (e, name) => {
    if (e.target.checked) {
      setSelectedBrand((prevState) => [...prevState, name]);
    } else {
      setSelectedBrand((prev) => prev.filter((brand) => name !== brand));
    }
  };

  // showing count of products number
  const productsCountByCategory = allProducts?.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + 1;
    return acc;
  }, {});

  const productsCountByBrand = allProducts?.reduce((acc, cur) => {
    acc[cur.brand.toLowerCase()] = (acc[cur.brand.toLowerCase()] || 0) + 1;
    return acc;
  }, {});

  // Filtering products by BRANDS & CATEGORIES
  const brandFiltering = products.filter((p) =>
    selectedBrand.includes(p.brand.toLowerCase())
  );

  const catergoryFiltering = categorized?.flat(1);

  const filtering = catergoryFiltering.filter(
    (p) =>
      selectedBrand.includes(p.brand.toLowerCase()) &&
      selectedCategory.includes(p.category.toLowerCase())
  );




  // For Medium Screens (Desktop)
  ////////////////////////////////////////////////////////////////////////////////////////
  const mediumScreenCode= function(){
    if(window.innerWidth >= 600){
      const allFilters =
  selectedBrand.length === 0 && selectedCategory.length === 0
    ? products
    : selectedBrand.length !== 0 && selectedCategory.length === 0
    ? brandFiltering
    : selectedBrand.length === 0 && selectedCategory.length !== 0
    ? catergoryFiltering
    : selectedBrand.length !== 0 && selectedCategory.length !== 0
    ? filtering
    : console.log("end");
  const LowPriceSort= allFilters.slice().sort((a, b) => a.price - b.price);    
  const HighPriceSort= allFilters.slice().sort((a, b) => b.price - a.price);

  
  const searchFiltering = searchedProducts?.filter(
    (p) =>
    selectedBrand.length === 0 ||
    selectedBrand.includes(p.brand.toLowerCase())
    );
    
    const sortedFilteredProducts = () => {
      if (onSortSelect === "Featured"){
        return allFilters;
      } else if (onSortSelect === "Lowest Price") {
        return LowPriceSort;
      } else if (onSortSelect === "Highest Price") {
        return HighPriceSort
      } 
    };

  const sortedSearchedProducts = () => {
    if (onSortSelect === "Featured") {
      return searchFiltering;
    } else if (onSortSelect === "Lowest Price") {
      return searchFiltering.sort((a, b) => a.price - b.price);
    } else if (onSortSelect === "Highest Price") {
      return searchFiltering.sort((a, b) => b.price - a.price);
    }
  };

  const showingProducts =
    searchInput === "" ? sortedFilteredProducts() : sortedSearchedProducts();

    return showingProducts
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////


  // For Small Screens (Mobile)
  ////////////////////////////////////////////////////////////////////////////////////////
  const smallScreenCode= function(){
    if(window.innerWidth < 600){

      const SmallScreenFilter =
    brandized.length === 0 && categorized.length === 0
      ? products
      : brandized.length !== 0 && categorized.length === 0
      ? brandized
      : brandized.length === 0 && categorized.length !== 0
      ? categorized
      : brandized.length !== 0 && categorized.length !== 0
      ? bAndC
      : console.log("end");

  const sortedFilteredProductsX = () => {
    if (onSortSelect === "Featured") {
      return SmallScreenFilter;
    } else if (onSortSelect === "Lowest Price") {
      return SmallScreenFilter.slice().sort((a, b) => a.price - b.price);
    } else if (onSortSelect === "Highest Price") {
      return SmallScreenFilter.slice().sort((a, b) => b.price - a.price);
    }
  };
  const sortedSearchedProductsX = () => {
    if (onSortSelect === "Featured") {
      return searchedProducts;
    } else if (onSortSelect === "Lowest Price") {
      return searchedProducts.sort((a, b) => a.price - b.price);
    } else if (onSortSelect === "Highest Price") {
      return searchedProducts.sort((a, b) => b.price - a.price);
    }
  };

  const showingProductsX =
  searchInput === "" ? sortedFilteredProductsX() : sortedSearchedProductsX();

  return showingProductsX
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Row className="main-container" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {window.innerWidth > 600 ? (
        <>
          <Col className="filtering-container" span={6} xs={6} sm={6} md={6}>
            <Sorter setOnSortSelect={setOnSortSelect} />
            <Filter
              filters={categories}
              onChecked={onCheckedCategory}
              count={productsCountByCategory}
              filter={category}
              setFilter={setCategory}
              searchPlaceHolder={"search for categories"}
            />
            <Filter
              filters={brands}
              onChecked={onCheckedBrand}
              count={productsCountByBrand}
              filter={brand}
              setFilter={setBrand}
              searchPlaceHolder={"search for brands"}
            />
          </Col>
          <Col span={17} className="gutter-row products-container">
            {mediumScreenCode().map((product, i) => (
              <Product
                product={product}
                i={i}
                key={i}
                setProductsInCart={setProductsInCart}
                productsInCart={productsInCart}
                singleProduct={singleProduct}
                setSingleProduct={setSingleProduct}
              />
            ))}
          </Col>
        </>
      ) : (
        <Col span={17} className="gutter-row products-container">
          <FilterSmall
            setOnSortSelect={setOnSortSelect}
            categories={categories}
            onCheckedCategory={onCheckedCategory}
            setCategorized={setCategorized}
            categorized={categorized}
            brands={brands}
            products={allProducts}
            setBrandized={setBrandized}
            brandized={brandized}
            setBrandsAndCategory={setBandC}
          />
          {smallScreenCode().map((product, i) => (
            <Product
              product={product}
              i={i}
              key={i}
              setProductsInCart={setProductsInCart}
              productsInCart={productsInCart}
              singleProduct={singleProduct}
              setSingleProduct={setSingleProduct}
            />
          ))}
        </Col>
      )}

      <Button className="load-more-btn" onClick={() => setPage(page + 1)}>
        More Products
      </Button>
    </Row>
  );
};

export default Products;
