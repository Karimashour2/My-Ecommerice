import { FilterOutlined } from "@ant-design/icons";
import { Menu, Select } from "antd";
import axios from "axios";
import './FilterSmall.css';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const onSearch = (value) => {
  console.log("search:", value);
};

const FilterSmall = ({
  setOnSortSelect,
  categories,
  setCategorized,
  categorized,
  brands,
  products,
  setBrandized,
  brandized,
  setBrandsAndCategory,
}) => {
  const onChangeCategory = (value) => {
    console.log(`selected ${value}`);
    axios
      .get(`https://dummyjson.com/products/category/${value}`)
      .then((res) => setCategorized(res.data.products));
    if(brandized.length !== 0){
      setBrandsAndCategory(() =>
      brandized?.filter((p) => p.category.toLowerCase() === value)
    );
    }
  };
  const onChangeBrand = (value) => {
    setBrandized(() =>
      products?.filter((p) => p.brand.toLowerCase() === value)
    );
    setBrandsAndCategory(() =>
      categorized?.filter((p) => p.brand.toLowerCase() === value)
    );
  };

  const items = [
    getItem("Filters", "sub1", <FilterOutlined />, [
      getItem(
        <Select
          defaultValue="Featured"
          style={{
            width: "100%",
          }}
          onChange={(value) => setOnSortSelect(value)}
          options={[
            {
              value: "Featured",
              label: "Featured",
            },
            {
              value: "Lowest Price",
              label: "Lowest Price",
            },
            {
              value: "Highest Price",
              label: "Highest Price",
            },
          ]}
        />,
        "sort"
      ),
      getItem(
        <Select
          style={{
            width: "100%",
          }}
          showSearch
          allowClear
          placeholder="Select a category"
          optionFilterProp="children"
          onChange={onChangeCategory}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={categories.map((c) => {
            return { value: c, label: c };
          })}
        />,
        "2"
      ),
      getItem(
        <Select
          style={{
            width: "100%",
          }}
          showSearch
          allowClear
          placeholder="Select a brand"
          optionFilterProp="children"
          onChange={onChangeBrand}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={brands.map((b) => {
            return { value: b, label: b };
          })}
        />,
        "3"
      ),
    ]),
  ];


  return (
      <Menu
        className="small-filter"
        mode="inline"
        inlineIndent={10}
        style={{
          width: 256,
        }}
        items={items}
      />
  );
};

export default FilterSmall;
