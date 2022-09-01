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
import Category  from "../components/Category";


function App() {

const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logPersist());
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
   
            </Routes>
        </div>
    );
}

export default App;
