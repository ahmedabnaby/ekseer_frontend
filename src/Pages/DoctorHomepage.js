import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from "../Includes/Footer"

const DoctorHomePage = () => {
    // const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    
    var isLoggedIn = false;

    const { state } = useLocation();
    const nav = useNavigate();

    if (state != null) {
        isLoggedIn = true;
    }

    const navigateWithData = () => {
        nav('/calls', {
            state: {
                logInToken: state.logInToken,
                loggedInUser: state.loggedInUser
            }
        });
    }
    return (
        <>
            {isLoggedIn === false ?
                <div className="quality_area">
                    <div className="container">
                        <div className="row justify-content-center ">
                            <div className="col-lg-6">
                                <div className="section_title mb-55 text-center">
                                    <h3 className='mt-5'>Join us now!</h3>
                                    <p>You must read our <a href="#" style={{ color: "#BA8ABB" }}>prerequisites.</a>.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6">
                                <div className="single_quality">
                                    <div className="icon" style={{ backgroundImage: "-webkit-linear-gradient(90deg, #BA8ABB 0%, #BA8ABB 100%)" }}>
                                        <i className="flaticon-doctor"></i>
                                    </div>
                                    <h3>Ready to receive calls?</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                    <a href="/register-as-doctor" style={{ background: "#BA8ABB", border: '#BA8ABB' }} className="boxed-btn mt-4">Register now!</a>
                                    <h6 className='mt-5'>Have an account? <a href='/login' style={{ color: "#ba8abb" }}> Login here!</a></h6>
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
                                    <h3 className='mt-5'>Join us now!</h3>
                                    <p>You must read our <a href="#" style={{ color: "#BA8ABB" }}>prerequisites.</a>.</p>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6">
                                <div className="single_quality">
                                    <div className="icon" style={{ backgroundImage: "-webkit-linear-gradient(90deg, #BA8ABB 0%, #BA8ABB 100%)" }}>
                                        <i className="flaticon-doctor"></i>
                                    </div>
                                    <h3>Ready to receive calls?</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                                    <div className="boxed-btn mt-4" style={{ background: "#BA8ABB", border: '#BA8ABB' }} onClick={navigateWithData}>Start accepting calls!</div>
                                    <h6 className='mt-5'>Have an account? <a href='/login' style={{ color: "#ba8abb" }}> Login here!</a></h6>
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

export default DoctorHomePage;
