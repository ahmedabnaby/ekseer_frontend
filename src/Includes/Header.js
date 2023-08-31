import React, { useState, useEffect } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { useLocation, useNavigate } from "react-router-dom";
const Header = () => {
  const { state } = useLocation();
  const nav = useNavigate();

  const [logInToken, setLoginToken] = useState(null)
  const [loggedInUser, setLoggedInUser] = useState(null)
  var isLoggedIn = false;

  if (state != null) {
    var isLoggedIn = true;
  }

  const navigateHomePage = () => {
    if (state != null) {
      nav('/', {
        state: {
          logInToken: state.logInToken,
          loggedInUser: state.loggedInUser
        }
      });
    }
    else {
      nav('/');
    }
    window.location.reload()
  }
  const navigateDoctorHomePage = () => {
    if (state != null) {
      nav('/doctor-homepage', {
        state: {
          logInToken: state.logInToken,
          loggedInUser: state.loggedInUser
        }
      });
    }
    else {
      nav('/doctor-homepage');
    }
    window.location.reload()
  }
  const navigateAboutUs = () => {
    if (state != null) {
      nav('/', {
        state: {
          logInToken: state.logInToken,
          loggedInUser: state.loggedInUser
        }
      });
    }
    else {
      nav('/');
    }
    window.location.reload()
  }
  const navigateContactUs = () => {
    if (state != null) {
      nav('/contact-us', {
        state: {
          logInToken: state.logInToken,
          loggedInUser: state.loggedInUser
        }
      });
    }
    else {
      nav('/contact-us');
    }
    window.location.reload()
  }
  const navigateViewDoctorConsultation = () => {
    nav('/doctor-consultation', {
      state: {
        logInToken: state.logInToken,
        loggedInUser: state.loggedInUser
      }
    });
    window.location.reload()
  }
  const navigateViewPatientrConsultation = () => {
    nav('/patient-consultation', {
      state: {
        logInToken: state.logInToken,
        loggedInUser: state.loggedInUser
      }
    });
    window.location.reload()
  }
  const navigateUpdateProfile = () => {
    nav(`/update-profile/${state.loggedInUser.id}`, {
      state: {
        logInToken: state.logInToken,
        loggedInUser: state.loggedInUser
      }
    });
    window.location.reload()
  }
  const logout = () => {
    nav('/logout', {
      state: {
        logInToken: state.logInToken,
        loggedInUser: state.loggedInUser
      }
    });
  }
  const login = () => {
    nav('/login');
    window.location.reload()
  }
  return (
    <header>
      <div className="header-area ">
        <div id="sticky-header" className="main-header-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3">
                <div className="logo-img">
                  {isLoggedIn && state.loggedInUser.is_doctor ?
                    <div onClick={navigateDoctorHomePage}>
                      <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="" />
                    </div>
                    :
                    <div onClick={navigateHomePage}>
                      <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="" />
                    </div>
                  }
                </div>
              </div>
              <div className="col-xl-9 col-lg-9">
                <div className="menu_wrap d-none d-lg-block">
                  <div className="menu_wrap_inner d-flex align-items-center justify-content-end">
                    <div className="main-menu">
                      <nav>
                        <ul id="navigation">
                          <li>
                            <a href='/'>
                              home
                            </a>
                          </li>
                          <li>
                            <a href="about.html">About</a>
                          </li>
                          <li>
                            <a href="#">
                              blog <i className="ti-angle-down"></i>
                            </a>
                            <ul className="submenu">
                              <li>
                                <a href="blog.html">blog</a>
                              </li>
                              <li>
                                <a href="single-blog.html">single-blog</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="#">
                              pages <i className="ti-angle-down"></i>
                            </a>
                            <ul className="submenu">
                              <li>
                                <a href="department.html">Department</a>
                              </li>
                              <li>
                                <a href="more.html">More</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="/contact-us">Contact</a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                    <div className="book_room">
                      <div className="book_btn">
                        <a className="popup-with-form" href="#test-form">
                          Book Appointment
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 text-right">
                <div className="mobile_menu d-block d-lg-none">
                  {isLoggedIn ?
                    <Menu>
                      {state.loggedInUser.is_doctor ?
                        (
                          <div>
                            <div id="home" className="menu-item" onClick={navigateDoctorHomePage}>
                              <img src='/img/icons/home.png' style={{ display: 'inline-block', position: 'relative', top: '-2px', marginRight: '5px' }} />
                              Home
                            </div>
                            <div id="view-consultation" className="menu-item" onClick={navigateViewDoctorConsultation} style={{ marginTop: '13px' }}>
                              <img src='/img/icons/notes.png' style={{ display: 'inline-block', position: 'relative', width: '20px', marginRight: '5px', top: '-2px' }} />
                              View consultations
                            </div>
                          </div>
                        )
                        : (
                          <div>
                            <div id="home" className="menu-item" onClick={navigateHomePage}>
                              <img src='/img/icons/home.png' style={{ display: 'inline-block', position: 'relative', top: '-2px', marginRight: '5px' }} />
                              Home
                            </div>
                            <div id="view-consultation" className="menu-item" onClick={navigateViewPatientrConsultation} style={{ marginTop: '13px' }}>
                              <img src='/img/icons/notes.png' style={{ display: 'inline-block', position: 'relative', width: '20px', marginRight: '5px', top: '-2px' }} />
                              View consultations
                            </div>
                          </div>
                        )
                      }
                      <div id="about" className="menu-item" onClick={navigateAboutUs}>
                        <img src='/img/icons/about.png' style={{ display: 'inline-block', position: 'relative', top: '-2px', marginRight: '5px' }} />
                        About us
                      </div>
                      <div id="contact" className="menu-item" onClick={navigateContactUs}>
                        <img src='/img/icons/contact-us.png' style={{ display: 'inline-block', position: 'relative', width: '20px', marginRight: '5px' }} />
                        Contact us
                      </div>
                      <div id="update-profile" className="menu-item" onClick={navigateUpdateProfile}>
                        <img src='/img/icons/profile-user.png' style={{ display: 'inline-block', position: 'relative', width: '20px', marginRight: '5px', top: '-2px' }} />
                        Update Profile
                      </div>
                      {/* {state.loggedInUser.is_doctor ?
                        <div id="take-notes" className="menu-item" onClick={navigateTakeNotes}>
                          <img src='/img/icons/notes.png' style={{ display: 'inline-block', position: 'relative', width: '20px', marginRight: '5px', top: '-2px' }} />
                          Take Notes
                        </div>
                        :
                        ""
                      } */}
                      <div id="logout" className="menu-item" onClick={logout}>
                        <img src='/img/icons/logout.png' style={{ display: 'inline-block', position: 'relative', width: '20px', marginRight: '5px', top: '-2px' }} />
                        Logout
                      </div>
                    </Menu>
                    :
                    <Menu>
                      <div id="home" className="menu-item" onClick={navigateHomePage}>
                        <img src='/img/icons/home.png' style={{ display: 'inline-block', position: 'relative', top: '-2px', marginRight: '5px' }} />
                        Home
                      </div>
                      <div id="about" className="menu-item" onClick={navigateAboutUs}>
                        <img src='/img/icons/about.png' style={{ display: 'inline-block', position: 'relative', top: '-2px', marginRight: '5px' }} />
                        About us
                      </div>
                      <div id="contact" className="menu-item" onClick={navigateContactUs}>
                        <img src='/img/icons/contact-us.png' style={{ display: 'inline-block', position: 'relative', width: '20px', marginRight: '5px' }} />
                        Contact us
                      </div>
                      <div id="login" className="menu-item" onClick={login}>
                        <img src='/img/icons/login.png' style={{ display: 'inline-block', position: 'relative', width: '20px', marginRight: '5px', top: '-2px' }} />
                        Login
                      </div>
                    </Menu>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;