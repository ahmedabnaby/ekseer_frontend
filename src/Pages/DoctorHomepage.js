import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import addNotification from 'react-push-notification';
import logo from "../../src/logo.png"
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
    const [visible, setVisible] = useState(false);

    const Popup = () => {

        const modalRef = useRef(null);

        return (
            <div ref={modalRef} className="graphpop">
                <div className="content">
                    <div className="logo-img">
                        <img src="img/icons/emergency-call.png" alt="" />
                    </div>
                    <div>
                        <h2>You have a new<span style={{ color: "#ba8abb" }}> call!</span> </h2>
                        <div className="boxed-btn mt-4" style={{ background: "#BA8ABB", border: '#BA8ABB', display: 'block', marginBottom: '15px' }} onClick={navigateWithData}>View calls</div>
                    </div>
                </div>
            </div>
        );
    };

    const showPopup = () => {
        setVisible(true);
    };
    const closePopup = () => {
        setVisible(false);
    };

    const navigateWithData = () => {
        nav('/calls', {
            state: {
                logInToken: state.logInToken,
                loggedInUser: state.loggedInUser
            }
        });
    }
    const [calls, setCalls] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [newCalls, setNewCalls] = useState(false);

    const fetchNewCalls = async () => {
        await axios.get(`${BASE_URL}/calls/`)
            .then((response) => {
                setDataLoaded(true);
                setCalls(response.data);
                var i = 0;
                while (i < response.data.length) {
                    if ((response.data[i].is_new === false)) {
                        setNewCalls(false);
                    }
                    else {
                        setNewCalls(true);
                        addNotification({
                            native: true,
                            title: 'New Call!',
                            subtitle: 'You have a new call',
                            message: 'A new patient waiting for consultation',
                            closeButton: "X",
                            icon: logo,
                            onClick: () => nav('/calls', {
                                state: {
                                    logInToken: state.logInToken,
                                    loggedInUser: state.loggedInUser
                                }
                            })
                        })
                        showPopup()
                    }
                    i++
                }
            })
    }
    useEffect(() => {
        const interval = setInterval(() => {
            fetchNewCalls();
        }, 2000)
        return () => clearInterval(interval)
    }, []);
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
                state.loggedInUser.is_verified ?
                    <div className="quality_area">
                        {!newCalls ?
                            ""
                            :
                            visible && <Popup handleClose={closePopup} />

                        }
                        <div className="container">
                            <div className="row justify-content-center ">
                                <div className="col-lg-6">
                                    <h6 id='welcome-text'>Welcome {state.loggedInUser.full_name}!</h6>
                                    <div className="section_title mb-55 text-center">
                                        <h3 className='mt-3'>Welcome aboard!</h3>
                                        {/* <p>Would you make sure that you've read our <a href="#" style={{ color: "#BA8ABB" }}>prerequisites?</a></p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6">
                                    <div className="single_quality">
                                        <div className="icon" style={{ backgroundImage: "-webkit-linear-gradient(90deg, #BA8ABB 0%, #BA8ABB 100%)" }}>
                                            <i className="flaticon-doctor"></i>
                                        </div>
                                        <div className="boxed-btn mt-4" style={{ background: "#BA8ABB", border: '#BA8ABB', display: 'block', marginBottom: '15px' }} onClick={navigateWithData}>Start accepting consultations!</div>
                                        {/* <h3>Ready to receive calls?</h3> */}
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
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
                                        <h3 className='mt-3'>Welcome aboard!</h3>
                                        {/* <p>Would you make sure that you've read our <a href="#" style={{ color: "#BA8ABB" }}>prerequisites?</a></p> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6">
                                    <div className="single_quality">
                                        <div className="icon" style={{ backgroundImage: "-webkit-linear-gradient(90deg, #BA8ABB 0%, #BA8ABB 100%)" }}>
                                            <i className="flaticon-doctor"></i>
                                        </div>
                                        {/* <div className="boxed-btn mt-4" style={{ background: "#BA8ABB", border: '#BA8ABB', display: 'block', marginBottom: '15px' }} onClick={navigateWithData}>Start accepting consultations!</div> */}
                                        {/* <h3>Ready to receive calls?</h3> */}
                                        <p className='mt-5'>We are currently reviewing your application and once it's verified you will be ready to start accepting calls.
                                            Thank you!
                                        </p>
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
