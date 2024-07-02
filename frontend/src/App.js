import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import NavBar from './components/NavBar';
import AboutUs from './pages/AboutUs';
import Shop from './pages/Shop';
import Visit from './pages/Visit';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Summary from './pages/admin/Summary';
import CreateProduct from './pages/admin/CreateProduct';
import ProductsList from './pages/admin/list/ProductsList';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';
import ProductDetails from './pages/admin/list/details/ProductDetails';
import OrderDetails from './pages/admin/list/details/OrderDetails';
import UserDetails from './pages/admin/list/details/UserDetails';
import Checkout from './pages/Checkout';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer/>
          <NavBar />
          <Routes> 
            <Route path="/register" element={<Register />} /> 
            <Route path="/login" element={<Login />} /> 
            <Route path="/aboutUs" element={<AboutUs />} /> 
            <Route path="/shop" element={<Shop />} /> 
            <Route path="/visit" element={<Visit />} /> 
            <Route path="/gallery" element={<Gallery />} /> 
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/cart" element={<Cart />} /> 
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout-success/:orderId"  element={<CheckoutSuccess />} />
            <Route path="/product/:id" element={<ProductDetails />} /> 
            <Route path="/order/:id" element={<OrderDetails />} /> 
            <Route path="/user/:id" element={<UserDetails />} /> 
            <Route path="/admin" element={<Dashboard/>}>
              <Route path="summary" element={<Summary />} /> 
              <Route path="products" element={<Products />}>
                <Route index element={<ProductsList/>}/>
                <Route path="create-product" element={<CreateProduct/>}/>
              </Route>
              <Route path="orders" element={<Orders />} /> 
              <Route path="users" element={<Users />} /> 
            </Route>
            <Route path="/"  exact element={<Home />} /> 
            <Route path="*" element={<NotFound />} /> 
          </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
