import { Card, Checkbox } from "antd";
import Search from "antd/es/input/Search";
import PerfectScrollbar from "react-perfect-scrollbar";
import "./Filter.css";


const Filter = ({filter,setFilter,filters,onChecked,count,searchPlaceHolder}) => {

  const onSearch = (e) => {
    setFilter(e.target.value);
  };
  const filtered =
    filter === ""
      ? filters
      : filters.filter((c) => c.includes(filter.toLowerCase()));

  return (
    <Card className="filter-container" bordered={true}>
      <Search
        className="filter-searchbar"
        placeholder={searchPlaceHolder}
        allowClear
        onChange={onSearch}
      />

      <div className="filter-list">
        <PerfectScrollbar>
          {filtered.map((item, i) => (
            <div className="filter-item" key={`brand${i}`}>
              <Checkbox
                className="checkbox item-checkbox"
                onChange={(e) => onChecked(e, item)}
              >
                {item}
              </Checkbox>

              <div className="products-count">
                <span>{count[item]}</span>
              </div>
            </div>
          ))}
        </PerfectScrollbar>
      </div>
    </Card>
  );
};

export default Filter;
