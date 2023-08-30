import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from '../Includes/Footer'


function Questions() {
    const { state } = useLocation();
    const nav = useNavigate();

    const Popup = ({ handleClose }) => {


        const modalRef = useRef(null);

        const closeWithAnimation = () => {
            if (modalRef.current) {
                modalRef.current.classList.add("closing");
                modalRef.current.classList.remove("closing");
                handleClose();
                nav('/', {
                    state: {
                        logInToken: state.logInToken,
                        loggedInUser: state.loggedInUser
                    }
                });
            }
        }; return (
            <div ref={modalRef} className="graphpop">
                <div className="content">
                    <div className="logo-img">
                        <img src="img/icons/emergency-call.png" style={{margin:'30px auto'}} alt="" />
                    </div>
                    <h2><a href="#tel:911" style={{ color: "#ba8abb" }}>Call 911</a> or go to nearest emergency hospital with these suggested <a href="#" style={{ color: "#ba8abb" }}>locations</a></h2>
                    <div className="cancel-btn">
                        <img src="img/icons/cancel.png" id="cancel-here" onClick={closeWithAnimation} />
                    </div>
                </div>
            </div>
        );
    };

    const [visible, setVisible] = useState(false);

    const showPopup = () => {
        setVisible(true);
    };

    const closePopup = () => {
        setVisible(false);
    };
    const showHint1 = () => {
        var hint = document.querySelector("#popupHint1")
        hint.style.display = "block"
    };
    const hideHint1 = () => {
        var hint = document.querySelector("#popupHint1")
        hint.style.display = "none"
    };
    const showHint2 = () => {
        var hint = document.querySelector("#popupHint2")
        hint.style.display = "block"
    };
    const hideHint2 = () => {
        var hint = document.querySelector("#popupHint2")
        hint.style.display = "none"
    };
    const showHint3 = () => {
        var hint = document.querySelector("#popupHint3")
        hint.style.display = "block"
    };
    const hideHint3 = () => {
        var hint = document.querySelector("#popupHint3")
        hint.style.display = "none"
    };
    const hideSuccessPopup = () => {
        var popUpSelector = document.querySelector("#d-none")
        popUpSelector.style.visibility = "hidden"
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        var popUpSelector = document.querySelector("#d-none")
        popUpSelector.style.visibility = "visible"
        setTimeout(() => {
            nav("/signaling", {
                state: {
                    logInToken: state.logInToken,
                    loggedInUser: state.loggedInUser
                }
            });
        }, 2000)
    };
    return (
        <>
            <div className="depertment_area">
                <div className="container">
                    <div className="row custom_align align-items-end justify-content-between">
                        <div className="col-lg-6">
                            <div className="section_title">
                                <h3 className="purple_c">Before you start the call with our specialists</h3>
                                <h6 className="purple_c mb-4">You need to answer a few questions in order to escalate your condition.</h6>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-4">
                            <form onSubmit={handleSubmit}>
                                <p>1) Are you less than 14 years old?</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo1" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo1" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>2) Are you physically in Riyadh City?</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo2" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo2" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>3) Do you feel you can’t maintain your airway breathing?</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo3" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo3" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>4) Are you complaining of severe difficult breathing?</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo4" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo4" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>5) Do you complain of Severe or continuous Bleeding?</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo5" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo5" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>6) Do you complain of severe trauma?&nbsp;
                                    <img className="hintIcon" src="img/icons/info.png" onMouseEnter={showHint1} onMouseLeave={hideHint1} />
                                    <span id="popupHint1">
                                        (e.g., falls from a horse or falls from height, multiple fractures, or others)
                                    </span>
                                </p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo6" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo6" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>7) Have you been physically assaulted?</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo7" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo7" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>8) Have you been in a car or motorcycle accident or run over?</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo8" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo8" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>9) Is there loss or a low level of Consciousness at any time?</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo9" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo9" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>10) Are there any prohibited substances used?</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo10" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo10" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>11) Are you complaining of seizures at any time?</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo11" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo11" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>
                                    12) Are you complaining of a symptom of stroke?&nbsp;
                                    <img className="hintIcon" src="img/icons/info.png" onMouseEnter={showHint2} onMouseLeave={hideHint2} />
                                    <span id="popupHint2">
                                        e.g.:<br />
                                        o	Numbness or weakness of the face, arm, or leg, especially on one side of the body.<br />
                                        o	Trouble with speaking and understanding.<br />
                                        o	Trouble with seeing in one or both eyes.<br />
                                        o	Trouble with walking, dizziness, and loss of balance.<br />
                                        o	A sudden, severe headache, which may be accompanied by vomiting.


                                    </span>
                                </p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo12" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo12" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>13) Are you complaining of severe pain in any part of your body?</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo13" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo13" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>14) Are you complaining of chest pain?</p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo14" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo14" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <p>15) Are you complaining of psychological symptoms?
                                    &nbsp;
                                    <img className="hintIcon" src="img/icons/info.png" onMouseEnter={showHint3} onMouseLeave={hideHint3} />
                                    <span id="popupHint3">
                                        e.g<br />
                                        o	Hallucinations.<br />
                                        o	Delusions.<br />
                                        o	Disturbed thoughts.<br />
                                        o	Behavior changes.<br />
                                        o	Depression.<br />
                                        o	Obsession.<br />
                                        o	Suicidal thoughts.<br />
                                        o	Harming others, etc.<br />
                                    </span>
                                </p>
                                &nbsp; <input type="radio" id="yes" name="yesOrNo15" defaultValue="YES" onChange={showPopup} />
                                {visible && <Popup handleClose={closePopup} />}
                                &nbsp; <label htmlFor="yes">Yes</label><br />
                                &nbsp; <input type="radio" id="no" name="yesOrNo15" defaultValue="NO" required />
                                &nbsp; <label htmlFor="no">No</label><br />
                                <br />
                                <div className="graphpop" id="d-none">
                                    <div className="content">
                                        <div className="logo-img">
                                            <a href="/">
                                                <img src="img/icons/double-check.gif" alt="" />
                                            </a>
                                        </div>
                                        <h2><span style={{ color: "#ba8abb" }}>You're</span> ready to start your <span style={{ color: "#24ab94" }}>consultation!</span></h2>
                                        <div className="cancel-btn">
                                            <img src="img/icons/cancel.png" id="cancel-here" onClick={hideSuccessPopup} />
                                        </div>
                                    </div>
                                    {/* {setTimeout(() => {
                                        nav("/available-doctors")
                                    }, 2000)} */}
                                </div>
                                <button type="submit" className="boxed-btn" style={{ width: "100%" }}>Request Consultation</button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Questions;
