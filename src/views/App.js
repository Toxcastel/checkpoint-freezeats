import { Routes, Route } from "react-router-dom";
import Signup from "../components/Signup.jsx";
import Navbar from "../components/Navbar.jsx";
import Home from "../components/Home.jsx";

function App() {
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;
