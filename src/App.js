import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Includes/Header';
import HomePage from './Pages/Homepage';
import Footer from './Includes/Footer';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Questions from './Pages/Questions';
import Logout from './Includes/Logout';
import Contact from './Pages/Contact';
import ClockLoader from "react-spinners/ClockLoader";
import DoctorRegister from './Pages/DoctorRegister';
import DoctorsList from './Pages/DoctorsList';
import DoctorHomepage from './Pages/DoctorHomepage';
import { VideoRoom } from './Pages/VideoRoom';

function App() {
  const [loading, setLoading] = useState(false)
  const override = {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto",
  };
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 0)
  }, [])
  return (
    <div>
      {
        loading ?
          <div className='app'>

            <ClockLoader
              color={"#24ab94"}
              loading={loading}
              cssOverride={override}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          :
          <BrowserRouter>
            <Header />
            <Routes>
              <Route exact path="/" index element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register-as-doctor" element={<DoctorRegister />} />
              <Route path="/login" element={<Login />} />
              <Route path="/questions" element={<Questions />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/available-doctors" element={<DoctorsList />} />
              <Route path="/doctor-homepage" element={<DoctorHomepage />} />
              <Route path="/video-room" element={<VideoRoom />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
            <Footer />
          </BrowserRouter>
      }


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