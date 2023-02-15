import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import "react-perfect-scrollbar/dist/css/styles.css";
import Products from "./Pages/Shop/Products";
import LayOut from "./Pages/Layout/LayOut";
import User from "./Pages/User/User";
import SingleProductPage from "./Pages/Shop/Product/SingleProductPage";
import ResultSuccess from "./Pages/ResultSuccess";
import ResultFailed from "./Pages/ResultFailed";



function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/shop" element={<LayOut />}>
          <Route path="products" element={<Products />}/>
          <Route path="product/:id" element={<SingleProductPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="user" element={<User />} />
        </Route>
        <Route path='/result-success' element={<ResultSuccess/>}/>
        <Route path='/result-failed' element={<ResultFailed/>}/>
      </Routes>
    </div>
  );
}

export default App;
