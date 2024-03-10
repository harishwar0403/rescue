import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./routes/About";
import Home from "./routes/Home";
import Contact from "./routes/Contact";
import Pro from "./routes/Pro";
import Register from "./routes/Register";
import Login from "./routes/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/Pro" element={<Pro />}></Route>
        <Route path="/*" element={<Contact />}></Route>
      </Routes>
    </div>
  );
}

export default App;
