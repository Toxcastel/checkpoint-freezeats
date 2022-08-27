import { Routes, Route} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect} from "react";
import { logPersist } from "../store/reducers/userReducer.js";
import Profile from "../components/Profile.jsx";
import Navbar from "../components/Navbar.jsx";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import Home from "../components/Home.jsx";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logPersist());
    }, [dispatch]);

    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} /> 
            </Routes>
        </div>
    );
}

export default App;
