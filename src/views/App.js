import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logPersist } from "../store/reducers/userReducer.js";
import Profile from "../components/Profile.jsx";
import Navbar from "../components/Navbar.jsx";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import Home from "../components/Home.jsx";
import Car from "../components/Car.jsx";
import Order from "../components/Order.jsx";
import { fetchCart } from "../store/reducers/cartReducer.js";
import Dashboard from "./dashboard/Dashboard.jsx";
import Resume from "../components/Resume.jsx";
import { getAdmin } from "../store/reducers/adminLog.js";
import CategoryContainer from "../components/CategoryContainer.jsx";

import Fav from "../components/Fav.jsx";
import NotFound from "../components/NotFound.jsx";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logPersist());
        dispatch(getAdmin());
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
                <Route
                    path="/products/category/:category"
                    element={<CategoryContainer />}
                />
                <Route path="/order" element={<Order />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/fav" element={<Fav />} />
                <Route path="/checkout" element={<Order />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Car />
        </div>
    );
}

export default App;
