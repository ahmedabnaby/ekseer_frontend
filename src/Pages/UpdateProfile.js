import React, { useState, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import Footer from "../Includes/Footer"

function UpdateProfile() {
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    // const BASE_URL = 'https://ekseer.pythonanywhere.com/authentication-api';
    const [emailErrors, setEmailErrors] = useState([]);
    const [mobileNumberErrors, setMobileNumberErrors] = useState([]);
    var thisUser = null;
    const nav = useNavigate();
    const location = useLocation();
    console.log("UPDATE PROFILE", location.state)
    var {id} = useParams();
    console.log(id)

    const [visible, setVisible] = useState(false);

    const Popup = ({ handleClose }) => {

        const navOut = () => {
            if(location.state.setUser.is_doctor === false){
                nav("/", {
                    state: {
                        setUser: location.state.setUser
                    }
                });
            }
            else{
                nav("/doctor-homepage", {
                    state: {
                        setUser: location.state.setUser
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
                        <a href="/">
                            <img src="/img/icons/double-check.gif" alt="success" />
                        </a>
                    </div>
                    <h2><span style={{ color: "#ba8abb" }}>Profile</span> upated <span style={{ color: "#24ab94" }}>successfully!</span></h2>
                    <div className="cancel-btn">
                        <img src="/img/icons/cancel.png" id="cancel-here" alt="cancel" onClick={closeWithAnimation} />
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
        bodyFormData.append("full_name", e.target.full_name.value);
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
    // useEffect(() => {
    //     setVisible(true);
    //     setTimeout(() => {
    //         nav("/login")
    //     }, 1100)
    // }, [])
    thisUser = location.state.setUser
    return (
        <div className="book_apointment_area">
            {console.log(thisUser)}
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
                                        <div className="col-xl-12">
                                            <label htmlFor="full_name">Your Full Name</label>
                                            <input type="text" name="full_name" id="full_name" placeholder="Full Name" defaultValue={thisUser.full_name} required />
                                        </div>
                                        
                                        <div className="col-xl-6">
                                            <label htmlFor="mobile_number">Your Mobile Number</label>
                                            <p className="error">{mobileNumberErrors.length > 0 ? `${mobileNumberErrors}` : ""}</p>
                                            <input type="number" id="mobile_number" name="mobile_number" placeholder="Mobile Number" defaultValue={thisUser.mobile_number} required />
                                        </div>
                                        <div className="col-xl-6">
                                            <label htmlFor="email">Your Email Address</label>
                                            <p className="error">{emailErrors.length > 0 ? `${emailErrors}` : ""}</p>
                                            <input type="email" name="email" id="email" placeholder="Email Address" defaultValue={thisUser.email} required />
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
            <Footer/>
        </div>
    );
}

export default UpdateProfile;
