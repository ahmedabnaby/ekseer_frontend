import React, { Component, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Footer from "../Includes/Footer"

const DoctorLogin = () => {
    // const BASE_URL = 'https://ekseer-backend.alsahaba.sa/authentication-api';
    const BASE_URL = 'https://ekseer-backend.alsahaba.sa/authentication-api';

    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState(null);


    const nav = useNavigate();
    const { state } = useLocation();

    const [visible, setVisible] = useState(false);

    const Popup = ({ handleClose }) => {

        const modalRef = useRef(null);

        const closeWithAnimation = () => {
            if (modalRef.current) {
                modalRef.current.classList.add("closing");
                modalRef.current.classList.remove("closing");
                handleClose();
                nav("/login");
            }
        }; return (
            <div ref={modalRef} className="graphpop">
                <div className="content">
                    <div className="logo-img">
                        <img src="img/icons/stop.gif" alt="" />
                    </div>
                    <h2><span style={{ color: "#ba8abb" }}>Wrong</span> Credentials! </h2>
                    <div className="cancel-btn">
                        <img src="img/icons/cancel.png" id="cancel-here" onClick={closeWithAnimation} />
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
        bodyFormData.append("iqama_number", e.target.iqama_number.value);
        bodyFormData.append("password", e.target.password.value);
        axios({
            method: "post",
            url: `${BASE_URL}/login/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                if (response.data.user.is_doctor) {
                    nav("/doctor-homepage", {
                        state: {
                            logInToken: response.data.token,
                            loggedInUser: response.data.user
                        }
                    });
                }
                else {
                    nav('/', {
                        state: {
                            logInToken: response.data.token,
                            loggedInUser: response.data.user
                        }
                    });
                }
            })
            .catch(function (response) {
                console.log(response)
                if (response.response.data.non_field_errors) {
                    setErrors(response.response.data.non_field_errors[0])
                    showPopup()
                }
                else {
                    return;
                }
            });

    };
    return (
        <div className="book_apointment_area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="popup_box ">
                            <div className="popup_inner">
                                <h3>
                                    Login as a doctor
                                    <span>Here!</span>
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    {/* <p className="error">{errors.length > 0 ? `${errors}` : ""}</p> */}
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <label htmlFor="iqama_number">ID/Iqama Number</label>
                                            <input type="text" name="iqama_number" id="iqama_number" placeholder="Identification or Iqama number" required />
                                        </div>
                                        <div className="col-xl-6">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" className="password" placeholder="Password" id="password" required />
                                        </div>
                                        <div className="col-xl-12">
                                            <button type="submit" className="boxed-btn mt-4" style={{ width: "100%" }}>Login in</button>
                                        </div>
                                        <div className="container mt-4">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6">
                                                    <p className="copy_right text-left">
                                                        <a href="/register-as-doctor" style={{ width: '100' }}>New user? <span style={{ color: "#ba8abb", marginTop: "15px" }}> Register here</span>.</a>
                                                    </p>
                                                </div>
                                                <div className="col-lg-6 col-md-6">
                                                    <p className="copy_right" id="forget_password_text">
                                                        <a href="/forget-password" style={{ color: "#ba8abb" }}>Forgot your password?</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {visible && <Popup handleClose={closePopup} />}
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
export default DoctorLogin;
