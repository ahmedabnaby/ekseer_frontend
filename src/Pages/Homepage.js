

import React, { useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import Footer from '../Includes/Footer'

const HomePage = () => {
    // const BASE_URL = 'https://ekseer-backend.alsahaba.sa/authentication-api';
    const BASE_URL = 'https://ekseer-backend.alsahaba.sa/authentication-api';

    var isLoggedIn = false;

    const { state } = useLocation();
    const nav = useNavigate();

    if (state != null) {
        isLoggedIn = true;
    }

    const navigateWithData = () => {
        nav('/questions', {
            state: {
                logInToken: state.logInToken,
                loggedInUser: state.loggedInUser
            }
        });
    }
    const navigateViewPatientConsultation = () => {
        nav('/patient-consultation', {
            state: {
                logInToken: state.logInToken,
                loggedInUser: state.loggedInUser
            }
        });
        window.location.reload()
    }
    return (
        <>
            {isLoggedIn === false ?
                <div className="quality_area">
                    <div className="container">
                        <div className="row justify-content-center ">
                            <div className="col-lg-6">
                                <div className="section_title mb-55 text-center">
                                    {/* <h6>Are you a doctor? <a href='/doctor-homepage' style={{ color: "#ba8abb" }}> Join as a doctor!</a></h6> */}
                                    <h3 className='mt-2'>Ekseer</h3>
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
                                    <a href="/login" className="boxed-btn mt-4 mb-4" style={{ display: 'block' }}>Start Consultation!</a>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                    {/* <a href="/login" style={{ marginTop: "25px", width:'100%' }}>Already have an account? <br /><span style={{ color: "#ba8abb", marginTop: "15px" }}> Login here</span>.</a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
                :
                <div className="quality_area">
                    <div className="container">
                        <div className="row justify-content-center ">
                            <div className="col-lg-6">
                                <h6 id='welcome-text'>Welcome {state.loggedInUser.full_name}!</h6>
                                <div className="section_title mb-55 text-center">
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
                                    <div onClick={navigateWithData} className="boxed-btn mt-4">Start your consultation!</div>
                                    <br />
                                    <br />
                                    or
                                    <br />
                                    <div onClick={navigateViewPatientConsultation} className="boxed-btn mt-4">Follow up!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            }

        </>
    );
}

export default HomePage;
