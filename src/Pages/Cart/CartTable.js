import { Button, InputNumber, Table } from "antd";
import "./CartTable.css";
import { CloseOutlined } from "@ant-design/icons";

const priceAfterDiscount = "Price With Discount";
const removeProduct = "Remove Product";
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
  {
    title: priceAfterDiscount,
    className: "total",
    dataIndex: "Total Price",
    width: "20%",
  },
  {
    title: removeProduct,
    className: "remove",
    dataIndex: "Remove Product",
    width: "5%",
  },
];

const CartTable = ({ productsInCart, setProductsInCart, quantitys }) => {
  const data = productsInCart.map((p, i) => {
    p.quantity = quantitys[p.title];
    return {
      Product: (
        <div className="product-info" key={p.title + i}>
          <img
            className="product-image"
            key={"img" + i}
            src={p.thumbnail}
            alt={p.title}
          />
          <p key={"product" + i}>{p.title}</p>
        </div>
      ),
      Quantity: (
        <InputNumber
          key={"quantity" + i}
          className="quantity-number"
          defaultValue={p.quantity}
          onStep={(value) => value}
        />
      ),
      Price: <p key={"price" + i}>{p.price + " $"}</p>,
      [priceAfterDiscount]: (
        <p key={"discount" + i}>
          {(p.price * ((100 - p.discountPercentage) / 100)).toFixed(2) + " $"}
        </p>
      ),
      [removeProduct]: (
        <Button
          key={"remove-btn" + i}
          className="remove-btn"
          onClick={() =>
            setProductsInCart((prev) => prev.filter((el) => el.id !== p.id))
          }
          shape="circle"
          icon={<CloseOutlined key={"remove-icon" + i} />}
        />
      ),
    };
  });

  return (
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
  );
};

export default CartTable;
