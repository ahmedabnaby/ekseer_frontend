import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Questions() {
    const location = useLocation();
    const nav = useNavigate();
    const Popup = ({ handleClose }) => {
        const navOut = () => {
            nav("/",{
                state: {
                    setUser: location.state.setCurrectUser
                }
              });
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
                            <img src="img/icons/emergency-call.png" alt="" />
                        </a>
                    </div>
                    <h2><a href="#tel:911" style={{ color: "#ba8abb" }}>Call 911</a> or go to nearest emergency hospital with these suggested <a href="#" style={{ color: "#ba8abb" }}>locations</a></h2>
                    <div className="cancel-btn">
                        <img src="img/icons/cancel.png" id="cancel-here" onClick={closeWithAnimation} />
                    </div>
                </div>
            </div>
        );
    };
    var user = null;
    if (location.state == null) {
        user = null;
    }
    else {
        user = location.state.setCurrectUser;
        console.log(user)

    }
    const [visible, setVisible] = useState(false);

    const showPopup = () => {
        setVisible(true);
    };

    const closePopup = () => {
        setVisible(false);
    };

    // const radioDisabled = () => {
    //     var radioBtn = document.querySelector("#yes")
    //     if(radioBtn.value === "YES"){
    //         console.log("Selectedd")
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    return (
        <div>
            <div className="bradcam_area breadcam_bg_1">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bradcam_text">
                                <h3>Pre-consultation</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="depertment_area">
                <div className="container">
                    <div className="row custom_align align-items-end justify-content-between">
                        <div className="col-lg-6">
                            <div className="section_title">
                                <h3>Before you start the call with our specialists</h3>
                                <h6 className="mb-4">You need to answer a few questions in order to escalate your condition.</h6>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                            <form onSubmit={handleSubmit}>
                                <p>Are you complaining of:</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo1" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo1" defaultValue="NO" />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>Are you complaining of:</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo2" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo2" defaultValue="NO" />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>Are you complaining of:</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo3" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo3" defaultValue="NO" />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>Are you complaining of:</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo4" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo4" defaultValue="NO" />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>Are you complaining of:</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo5" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo5" defaultValue="NO" />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>Are you complaining of:</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo6" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo6" defaultValue="NO" />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>Are you complaining of:</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo7" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo7" defaultValue="NO" />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>Are you complaining of:</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo8" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo8" defaultValue="NO" />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>Are you complaining of:</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo9" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo9" defaultValue="NO" />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>Are you complaining of:</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo10" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo10" defaultValue="NO" />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                            </form>

                        </div>
                    </div>
                    <div className="dept_main_info white-bg">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                {/* single_content  */}
                                <div className="row align-items-center">
                                    <div className="col-lg-5">
                                        <div className="dept_thumb">
                                            <img src="img/banner/2.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="dept_info">
                                            <h3>Dentist with surgical mask holding <br /> scaler near patient</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                                            <a href="#" className="boxed-btn">Make An Appointment</a>
                                        </div>
                                    </div>
                                </div>
                                {/* single_content  */}
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                {/* single_content  */}
                                <div className="row align-items-center">
                                    <div className="col-lg-5">
                                        <div className="dept_thumb">
                                            <img src="img/department/1.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="dept_info">
                                            <h3>Dentist with surgical mask holding <br /> scaler near patient</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                                            <a href="#" className="boxed-btn">Make An Appointment</a>
                                        </div>
                                    </div>
                                </div>
                                {/* single_content  */}
                            </div>
                            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                {/* single_content  */}
                                <div className="row align-items-center">
                                    <div className="col-lg-5">
                                        <div className="dept_thumb">
                                            <img src="img/department/1.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="dept_info">
                                            <h3>Dentist with surgical mask holding <br /> scaler near patient</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                                            <a href="#" className="boxed-btn">Make An Appointment</a>
                                        </div>
                                    </div>
                                </div>
                                {/* single_content  */}
                            </div>
                            <div className="tab-pane fade" id="Astrology" role="tabpanel" aria-labelledby="Astrology-tab">
                                {/* single_content  */}
                                <div className="row align-items-center">
                                    <div className="col-lg-5">
                                        <div className="dept_thumb">
                                            <img src="img/department/1.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="dept_info">
                                            <h3>Dentist with surgical mask holding <br /> scaler near patient</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                                            <a href="#" className="boxed-btn">Make An Appointment</a>
                                        </div>
                                    </div>
                                </div>
                                {/* single_content  */}
                            </div>
                            <div className="tab-pane fade" id="Neuroanatomy" role="tabpanel" aria-labelledby="Neuroanatomy-tab">
                                {/* single_content  */}
                                <div className="row align-items-center">
                                    <div className="col-lg-5">
                                        <div className="dept_thumb">
                                            <img src="img/department/1.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="dept_info">
                                            <h3>Dentist with surgical mask holding <br /> scaler near patient</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                                            <a href="#" className="boxed-btn">Make An Appointment</a>
                                        </div>
                                    </div>
                                </div>
                                {/* single_content  */}
                            </div>
                            <div className="tab-pane fade" id="Blood" role="tabpanel" aria-labelledby="Blood-tab">
                                {/* single_content  */}
                                <div className="row align-items-center">
                                    <div className="col-lg-5">
                                        <div className="dept_thumb">
                                            <img src="img/department/1.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="dept_info">
                                            <h3>Dentist with surgical mask holding <br /> scaler near patient</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                                            <a href="#" className="boxed-btn">Make An Appointment</a>
                                        </div>
                                    </div>
                                </div>
                                {/* single_content  */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Questions;
