import React, { useState, useEffect } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { useLocation, useNavigate } from "react-router-dom";
function Header() {
  const location = useLocation();
  const nav = useNavigate();
  const [currectUser, setUser] = useState(null);

  console.log(location.state)
  if (location.state == null) {
    var user = null;
  }
  else {
    if (location.state.setUser == undefined) {
      var user = location.state.setCurrectUser;
    }
    else {
      var user = location.state.setUser;
    }
  }
  const navigateWithData = () => {
    console.log("UUUUSER", user)
    if (location.state == null) {
      var user = null;
      nav("/");
    }
    else {
      if (location.state.setUser == undefined) {
        var user = location.state.setCurrectUser;
      }
      else {
        var user = location.state.setUser;
      }
      setUser(user);
      if (user.is_doctor == false) {
        nav("/", {
          state: {
            setUser: user,
          }
        });
      }
      else {
        nav("/doctor-homepage", {
          state: {
            setUser: user,
          }
        });
      }
    }
    console.log("UUUUUUUUUUUUUUUUUUUUSER", user)
  }
  return (
    <header>
      <div className="header-area ">
        <div id="sticky-header" className="main-header-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3">
                <div className="logo-img">
                  <div onClick={navigateWithData}>
                    <img src="/img/logo.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9">
                <div className="menu_wrap d-none d-lg-block">
                  <div className="menu_wrap_inner d-flex align-items-center justify-content-end">
                    <div className="main-menu">
                      <nav>
                        <ul id="navigation">
                          <li>
                            <div onClick={navigateWithData}>
                              home
                            </div>
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
                  <Menu>
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/about">About</a>
                    <a id="contact" className="menu-item" href="/contact-us">Contact</a>
                    {user === null || user === "New User" ? "" :
                      <a id="logout" className="menu-item" href="/logout">Logout</a>
                    }
                    {/* <img src="img/logo.png" alt="" /> */}
                  </Menu>
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