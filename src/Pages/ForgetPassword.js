import React, { Component, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Footer from "../Includes/Footer"

function ForgetPassword() {
    // const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';

    // const [errors, setErrors] = useState([]);
    const nav = useNavigate();
    const { state } = useLocation();

    console.log(state)

    const [visible, setVisible] = useState(false);
    const [errorVisible, setErrorVisible] = useState(false);
    const errorModalRef = useRef(null);

    var isLoggedIn = false;

    if (state != null) {
        isLoggedIn = true
    }
    const ErrorPopup = ({ handleClose }) => {


        const closeWithAnimation = () => {
            if (errorModalRef.current) {
                errorModalRef.current.classList.add("closing");
                errorModalRef.current.classList.remove("closing");
                handleClose();
                nav("/forget-password")
            }
        }; return (
            <div ref={errorModalRef} className="graphpop">
                <div className="content">
                    <div className="logo-img">
                        <a href="/">
                            <img src="img/icons/stop.gif" alt="" />
                        </a>
                    </div>
                    <h2><span style={{ color: "#ba8abb" }}>Please try</span> again! </h2>
                    <div className="cancel-btn">
                        <img src="img/icons/cancel.png" id="cancel-here" onClick={closeWithAnimation} />
                    </div>
                </div>
                {setTimeout(() => {
                    closeErrorPopup()
                    nav("/forget-password")
                    window.location.reload()
                }, 2000)}
            </div>
        );
    };

    const showErrorPopup = () => {
        setErrorVisible(true);
    };
    const closeErrorPopup = () => {
        setErrorVisible(false);
    };

    const Popup = ({ handleClose }) => {

        const modalRef = useRef(null);

        const closeWithAnimation = () => {
            if (modalRef.current) {
                modalRef.current.classList.add("closing");
                modalRef.current.classList.remove("closing");
                handleClose();
                nav("/forget-password")
            }
        }; return (
            <div ref={modalRef} className="graphpop">
                <div className="content">
                    <div className="logo-img">
                        <a href="/">
                            <img src="img/icons/double-check.gif" alt="" />
                        </a>
                    </div>
                    <h2><span style={{ color: "#ba8abb" }}>Please check your</span> e-mail! </h2>
                    <div className="cancel-btn">
                        <img src="img/icons/cancel.png" id="cancel-here" onClick={closeWithAnimation} />
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append("email", e.target.email.value);
        axios({
            method: "post",
            url: `${BASE_URL}/password_reset/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.log(response);
                showPopup()
            })
            .catch(function (response) {
                console.log(response)
                showErrorPopup()
            });

    };
    return (
        <div className="book_apointment_area">
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-lg-7">
                        <div className="popup_box ">
                            <div className="popup_inner">
                                <h3>
                                    Forgot your
                                    <span>password?</span>
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        {isLoggedIn ?
                                            <div className="col-xl-6">
                                                <label htmlFor="email">E-mail</label>
                                                <input type="email" name="email" id="email" defaultValue={state.loggedInUser.email} placeholder="Enter Your Email" required />
                                            </div> :
                                            <div className="col-xl-6">
                                                <label htmlFor="email">E-mail</label>
                                                <input type="email" name="email" id="email" placeholder="Enter Your Email" required />
                                            </div>
                                        }
                                        <div className="col-xl-12">
                                            <button type="submit" className="boxed-btn mt-4" style={{ width: "100%" }}>Reset Password</button>
                                        </div>
                                        <div className="container mt-4">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12">
                                                    <p className="copy_right text-left">
                                                        <a href="/login" style={{ color: "#ba8abb" }}>Go Back?</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {visible && <Popup handleClose={closePopup} />}
                                    {errorVisible && <ErrorPopup handleClose={closeErrorPopup} />}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default ForgetPassword;
