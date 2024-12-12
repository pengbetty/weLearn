import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Components/Login";
import { Sign } from "./Components/Sign";
import { Home } from "./Components/Home";
import { Student } from "./Components/Student";
import { Contract } from "./Components/Contract";
import { CreateContract } from "./Components/CreateContract";
import { UpdateContract } from "./Components/UpdateContract";
// import { RoleProtectedRoute } from "./Components/RoleProtectedRoute";
import CreateStudent from "./Components/CreateStudent";
import { Colleges } from "./Components/Colleges";
import CreateCollege from "./Components/CreateCollege";
import { AppNavbar } from "./Components/Navbar";

function App() {
  return (
    <div>
      <AppNavbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/" element={<Home />} />
        <Route path="/student" element={<Student />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/create-college" element={<CreateCollege />} />
        <Route path="/create-contract" element={<CreateContract />} />
        <Route path="/update-contract/:id" element={<UpdateContract />} />
        <Route path="/create-student" element={<CreateStudent />} />
      </Routes>
    </div>
  );
}

export default App;

// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import { Route, Routes } from "react-router-dom";
// import { Login } from "./Components/Login";
// import { Sign } from "./Components/Sign";
// import { Home } from "./Components/Home";
// import { Student } from "./Components/Student";
// import { Contract } from "./Components/StudentContract";
// import { CreateContract } from "./Components/CreateContract";
// import { UpdateContract } from "./Components/UpdateContract";
// import { RoleProtectedRoute } from "./Components/RoleProtectedRoute";
// import CreateStudent from "./Components/CreateStudent";
// import { Colleges } from "./Components/Colleges";
// import CreateCollege from "./Components/CreateCollege";
// import { AppNavbar } from "./Components/Navbar";

// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/sign" element={<Sign />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/student" element={<Student />} />
//         <Route path="/contract" element={<Contract />} />
//         <Route path="/colleges" element={<Colleges />} />
//         <Route path="/create-contract" element={<CreateContract />} />
//         <Route path="/update-contract/:id" element={<UpdateContract />} />
//         <Route path="/create-student" element={<CreateStudent />} />
//         <Route path="/create-college" element={<CreateCollege />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
