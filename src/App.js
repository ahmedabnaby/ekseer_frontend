import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Includes/Header';
import HomePage from './Pages/Homepage';
import Footer from './Includes/Footer';
import Layout from './Includes/Layout';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Questions from './Pages/Questions';
import Logout from './Includes/Logout';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="questions" element={<Questions />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>


  );
}

export default App;
