import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Components/Login";
import { Sign } from "./Components/Sign";
import { Home } from "./Components/Home";
import { Student } from "./Components/Student";
import { Contract } from "./Components/StudentContract";
import { CreateContract } from "./Components/CreateContract";
import { UpdateContract } from "./Components/UpdateContract";
import { RoleProtectedRoute } from "./Components/RoleProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/create-contract" element={<CreateContract />} />
        <Route path="/update-contract/:id" element={<UpdateContract />} />
      </Routes>
    </div>
  );
}

export default App;
