import React, { useState, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from 'axios';

import Footer from "../Includes/Footer"

function UpdateProfile() {
    // const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';


    const nav = useNavigate();
    const { state } = useLocation();

    var { id } = useParams();

    const [visible, setVisible] = useState(false);

    const Popup = ({ handleClose }) => {

        const navOut = () => {
            if (state.loggedInUser.is_doctor === false) {
                nav("/", {
                    state: {
                        logInToken: state.logInToken,
                        loggedInUser: state.loggedInUser
                    }
                });
            }
            else {
                nav("/doctor-homepage", {
                    state: {
                        logInToken: state.logInToken,
                        loggedInUser: state.loggedInUser
                    }
                });
            }
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
                        <img src={process.env.PUBLIC_URL + '/img/icons/double-check.gif'} alt="success" />
                    </div>
                    <h2><span style={{ color: "#ba8abb" }}>Profile</span> upated <span style={{ color: "#24ab94" }}>successfully!</span></h2>
                    <div className="cancel-btn">
                        <img src={process.env.PUBLIC_URL + "/img/icons/cancel.png"} id="cancel-here" alt="cancel" onClick={closeWithAnimation} />
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
        bodyFormData.append("mobile_number", e.target.mobile_number.value);
        bodyFormData.append("email", e.target.email.value);
        axios({
            method: "put",
            url: `${BASE_URL}/update-user/${id}/`,
            data: bodyFormData,
            headers: { "Content-Type": "application/json" },
        })
            .then(function (response) {
                console.log(response);
                showPopup()
            })
            .catch(function (response) {
                console.log(response);
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
                                    Update your profile
                                    <span>Here!</span>
                                    <p>Note: All of the fields are required!</p>
                                </h3>
                                <form onSubmit={handleSubmit} encType="multipart/form-data" id="reg_form">
                                    <div className="row">

                                        <div className="col-xl-6">
                                            <label htmlFor="mobile_number">Your Mobile Number</label>
                                            <input type="number" id="mobile_number" name="mobile_number" placeholder="Mobile Number" defaultValue={state.loggedInUser.mobile_number} required />
                                        </div>
                                        <div className="col-xl-6">
                                            <label htmlFor="email">Your Email Address</label>
                                            <input type="email" name="email" id="email" placeholder="Email Address" defaultValue={state.loggedInUser.email} required />
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <p className="copy_right text-left">
                                                <a href="/forget-password" style={{ color: "#ba8abb" }}>Reset your password here.</a>
                                            </p>
                                        </div>
                                        <div className="col-xl-12 mt-4">
                                            {visible && <Popup handleClose={closePopup} />}
                                            <button type="submit" className="boxed-btn" style={{ width: "100%" }}>Update profile</button>
                                        </div>
                                    </div>
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

export default UpdateProfile;
