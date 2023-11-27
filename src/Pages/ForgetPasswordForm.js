import React, { Component, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import Footer from "../Includes/Footer"

function ForgetPasswordForm() {
    // const BASE_URL = 'https://ekseer-backend.alsahaba.sa/authentication-api';
    const BASE_URL = 'https://ekseer-backend.alsahaba.sa/authentication-api';

    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState(null);
    const nav = useNavigate();
    const location = useLocation();
    let {token} = useParams();
    console.log(token)
    const [visible, setVisible] = useState(false);

    const Popup = ({ handleClose }) => {

        const navOut = () => {
            if (location.state == null) {
                nav("/login", {
                    state: {
                        setUser: null
                    }
                });
            }
            else {
                nav("/login", {
                    state: {
                        setUser: location.state.setCurrectUser
                    }
                });
            }
            console.log(user)

        }
        const modalRef = useRef(null);

        const closeWithAnimation = () => {
            if (modalRef.current) {
                modalRef.current.classList.add("closing");
                modalRef.current.classList.remove("closing");
                handleClose();
                navOut()
            }
        }; return (
            <div ref={modalRef} className="graphpop">
                <div className="content">
                    <div className="logo-img">
                        <a href="/">
                            <img src="/img/icons/double-check.gif" alt="" />
                        </a>
                    </div>
                    <h2><span style={{ color: "#ba8abb" }}>Password</span> was reset successfully! </h2>
                    <div className="cancel-btn">
                        <img src="/img/icons/cancel.png" id="cancel-here" onClick={closeWithAnimation} />
                    </div>
                </div>
                {setTimeout(() => {
                    closePopup()
                    nav("/login")
                }, 2000)}
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
        bodyFormData.append("password", e.target.password.value);
        bodyFormData.append("token", token);
        axios({
            method: "post",
            url: `${BASE_URL}/password_reset/confirm/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
            console.log(response);
            showPopup()
        })
        .catch(function (response) {
            console.log(response)
            if (response.response.data.non_field_errors) {
                setErrors(response.response.data.non_field_errors[0])
            }
            else {
                return;
            }
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
                                    Reset your
                                    <span>password</span>
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <label htmlFor="password">New Password</label>
                                            <input type="password" name="password" id="password" placeholder="Enter Your New Password" required />
                                        </div>
                                        <div className="col-xl-12">
                                            <button type="submit" className="boxed-btn mt-4" style={{ width: "100%" }}>Reset Password</button>
                                        </div>
                                        {/* <div className="container mt-4">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12">
                                                    <p className="copy_right text-left">
                                                        <a href="/register" style={{ color: "#ba8abb" }}>Forgot your password?</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    {visible && <Popup handleClose={closePopup} />}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default ForgetPasswordForm;
