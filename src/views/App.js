import { Routes, Route } from "react-router-dom";
import Signup from "../components/Signup.jsx";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<>HOLA!</>} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

export default App;
