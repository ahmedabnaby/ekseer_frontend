import React from 'react'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Header from './Includes/Header';
import HomePage from './Pages/Homepage';
import Footer from './Includes/Footer';
import Layout from './Includes/Layout';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Questions from './Pages/Questions';
import Logout from './Includes/Logout';
import Contact from './Pages/Contact';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
            <Route exact path="/" index element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </BrowserRouter>

      {/* <BrowserRouter basename="/ekseer-v2/">
        <Header />
        <Routes>
            <Route exact path="/" index element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </BrowserRouter> */}
    </div>


  );
}

export default App;
