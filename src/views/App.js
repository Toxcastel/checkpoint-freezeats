import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "../components/Signup.jsx";
import NavBar from "../components/Navbar.jsx";
import { useState } from "react";
import axios from "axios";
import Products from "../components/Products.jsx";

function App() {

    return (
        <div className="App">
            <NavBar
        
      />
            <Routes>
                <Route path="/" element={<>HOLA!</>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/:category" element={<Products />} />
            </Routes>
        </div>
    );
}

export default App;
