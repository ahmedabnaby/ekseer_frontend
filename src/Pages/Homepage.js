

import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
function HomePage() {
    const location = useLocation();
    const nav = useNavigate();
    console.log(location.state)
    var user = null;
    if (location.state == null) {
        user = null;
    }
    else {
        user = location.state.setUser;
    }
    const [currectUser, setCurrectUser] = useState(null);
    const navigateWithData = () => {
        setCurrectUser(user);
        nav("/questions", {
            state: {
                setCurrectUser: user,
            }
        });
    }
    useEffect(() => {
        console.log(user)
    });
    return (
        <div className="quality_area">
            <div className="container">
                <div className="row justify-content-center ">
                    <div className="col-lg-6">
                        {user === null || user === "New User" ? "" :
                            <h6 id='welcome-text'>Welcome {user.full_name}</h6>
                        }
                        <div className="section_title mb-55 text-center">
                            <h6>Are you a doctor?<a href='#' style={{ color: "#ba8abb" }}> Join as a doctor!</a></h6>

                            <h3 className='mt-5'>Ekseer</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="single_quality">
                            <div className="icon">
                                <i className="flaticon-doctor"></i>
                            </div>
                            <h3>Start Consultation</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                            {user === null || user === "New User" ?
                                <a href="/register" className="boxed-btn mt-4">Register now!</a>
                                :
                                <div className="boxed-btn mt-4" onClick={navigateWithData}>Start your consultation!</div>
                            }
                            <h6 className='mt-5'>Have an account?<a href='/login' style={{ color: "#ba8abb" }}> Login here!</a></h6>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
