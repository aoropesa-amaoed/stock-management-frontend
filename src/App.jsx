import React from "react";
import { Routes, Route } from "react-router-dom";
import Items from "./pages/Items";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Received from "./pages/Received";
import Transfer from "./pages/Transfer";
import Requests from "./pages/Requests";
import "./App.css";

function App() {
  return (
   <div>
      <Routes>
          <Route path="/" element={<Dashboard/>} />          
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/item" element={<Items/>}/>
          <Route path="/received" element={<Received/>} />
          <Route path="/transfer" element={<Transfer/>}/>
          <Route path="/request" element={<Requests/>} />         
      </Routes>
   </div>

  );
}
export default App;
