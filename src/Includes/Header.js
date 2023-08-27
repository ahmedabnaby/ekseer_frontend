import React, { useState, useEffect } from 'react'
import { slide as Menu } from 'react-burger-menu'
import { useLocation, useNavigate } from "react-router-dom";
function Header() {
  const location = useLocation();
  const nav = useNavigate();
  const [currectUser, setUser] = useState([]);
  
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
  const navigateHomePage = () => {
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
    window.location.reload()
  }
  const navigateAboutUs = () => {
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
    window.location.reload()
  }
  const navigateContactUs = () => {
    console.log("UUUUSER", user)
    if (location.state == null) {
      var user = null;
      nav("/contact-us");
      window.location.reload()
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
        nav("/contact-us", {
          state: {
            setUser: user,
          }
        });
        window.location.reload()
      }
      else {
        nav("/contact-us", {
          state: {
            setUser: user,
          }
        });
        window.location.reload()
      }
    }
    console.log("UUUUUUUUUUUUUUUUUUUUSER", user)
  }
  const navigateUpdateProfile = () => {
    nav(`/update-profile/${user.id}`, {
            state: {
              setUser: user,
            }
          });
    window.location.reload()
  }
  const logout = () => {
    console.log("UUUUSER", user)
    if (location.state == null) {
      var user = null;
      nav("/logout");
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
        nav("/logout", {
          state: {
            setUser: user,
          }
        });
      }
      else {
        nav("/logout", {
          state: {
            setUser: user,
          }
        });
      }
    }
    console.log("UUUUUUUUUUUUUUUUUUUUSER", user)
    window.location.reload()
  }
  const login = () => {
    console.log("UUUUSER", user)
    if (location.state == null) {
      var user = null;
      nav("/login");
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
        nav("/login", {
          state: {
            setUser: user,
          }
        });
      }
      else {
        nav("/login", {
          state: {
            setUser: user,
          }
        });
      }
    }
    console.log("UUUUUUUUUUUUUUUUUUUUSER", user)
    window.location.reload()
  }

//   useEffect(() => {
//     setUser(user)
//     console.log('Do something after counter has changed', currectUser);
//  }, []);

  return (
    <header>
      {/* {console.log(user.id)} */}
      <div className="header-area ">
        <div id="sticky-header" className="main-header-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3">
                <div className="logo-img">
                  <div onClick={navigateHomePage}>
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
                            <div onClick={navigateHomePage}>
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
                    {user === null || user === "New User" ?
                      <div id="login" className="menu-item" onClick={login}>
                        <img src='/img/icons/login.png' style={{ display: 'inline-block', position: 'relative', width: '20px', marginRight: '5px', top: '-2px' }} />
                        Login
                      </div> :
                      ""
                    }
                    {user === null || user === "New User" ? "" :
                      <div id="update-profile" className="menu-item" onClick={navigateUpdateProfile}>
                        <img src='/img/icons/profile-user.png' style={{ display: 'inline-block', position: 'relative', width: '20px', marginRight: '5px', top: '-2px' }} />
                        Update Profile
                      </div>
                    }
                    {user === null || user === "New User" ? "" :
                    <>
                    {user.is_doctor?
                      <div id="update-profile" style={{color:'white'}} className="menu-item" onClick={navigateContactUs}>
                      <img src='/img/icons/notes.png' style={{ display: 'inline-block', position: 'relative', width: '20px', marginRight: '5px', top: '-2px' }} />
                      Take Notes
                    </div>
                    :
                    ""
                    }
                     </>
                    }
                    {user === null || user === "New User" ? "" :
                      <div id="logout" className="menu-item" onClick={logout}>
                        <img src='/img/icons/logout.png' style={{ display: 'inline-block', position: 'relative', width: '20px', marginRight: '5px', top: '-2px' }} />
                        Logout
                      </div>
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