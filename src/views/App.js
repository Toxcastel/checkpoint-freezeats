import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logPersist } from "../store/reducers/userReducer.js";
import Profile from "../components/Profile.jsx";
import Navbar from "../components/Navbar.jsx";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import Home from "../components/Home.jsx";
import Car from "../components/Car.jsx";
import Category from "../components/Category";
import Order from "../components/Order.jsx";
import { fetchCart } from "../store/reducers/cartReducer.js";
import Dashboard from "./dashboard/Dashboard.jsx";
import Fav from "../components/Fav.jsx";

function App() {
  const dispatch = useDispatch();
  const {user}=useSelector((state)=> state.user)
  useEffect(() => {
    dispatch(logPersist());
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/car" element={<Car />} />
        <Route path="/products/category/:category" element={<Category />} />
        <Route path="/order" element={<Order />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fav" element={<Fav />} />
      </Routes>
      <Car />
    </div>
  );
}

export default App;
