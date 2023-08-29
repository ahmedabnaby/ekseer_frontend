import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import PuffLoader from "react-spinners/PuffLoader";
import addNotification from 'react-push-notification';
import { Notifications } from 'react-push-notification';



export const NewCalls = () => {
    const { state } = useLocation();

    const override = {
        position: "absolute",
        top: "45vh",
        bottom: "0",
        right: "0",
        left: "0",
        margin:"0px auto"
    };

    const nav = useNavigate();

    const [meetingId, setMeetingId] = useState("");

    // const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';

    const [calls, setCalls] = useState([]);
    const [patients, setPatients] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isShown, setIsShown] = useState(false);

    var oldCalls = []
    const fetchNewCalls = async () => {
        await axios.get(`${BASE_URL}/calls/`).then((response) => {
            setDataLoaded(true);
            setCalls(response.data);
            showToastMessage("Call retrieved successfully!");
        })
    }
    const fetchPatients = async () => {
        await axios.get(`${BASE_URL}/users/`).then((response) => {
            setPatients(response.data);
        })
    }
    const showToastMessage = (message) => {
        setShowToast(true);
        setToastMessage(message);
        setTimeout(() => {
            hideToastMessage();
        }, 3000); // Hide the toast after 3 seconds
    };

    const hideToastMessage = () => {
        setShowToast(false);
        setToastMessage("");
    };
    const handleOnCLick = async (id, meeting_id) => {
        var bodyFormData = new FormData();
        var doctor_id = state.loggedInUser.id
        bodyFormData.append("meeting_id", meetingId);
        bodyFormData.append("doctor_id", doctor_id);
        bodyFormData.append("is_new", false);
        axios({
            method: "put",
            url: `${BASE_URL}/update-call/${id}/`,
            data: bodyFormData,
            headers: { "Content-Type": "application/json" },
        })
            .then(function (response) {
                nav('/signaling', {
                    state: {
                        logInToken: state.logInToken,
                        loggedInUser: state.loggedInUser,
                        meeting_id: meeting_id
                    }
                });
            })
            .catch(function (response) {
            });
    }

    const fetchCallsAndPatients = () => {
        fetchNewCalls()
        fetchPatients()
    }
    useEffect(() => {
        const interval = setInterval(() => {
            fetchCallsAndPatients();
            // if(calls.length > oldCalls.length){
            //     addNotification({
            //         title: 'New Call',
            //         subtitle: 'You have a new call',
            //         message: 'You have a new call',
            //         theme: 'light',
            //         closeButton:"X",
            //         backgroundTop:"green",
            //         native:true,
            //         backgroundBottom:"yellowgreen"
            //       })
            // }
        }, 5000)
        return () => clearInterval(interval)
    }, []);
    return (
        <>
            <section className="blog_area single-post-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 posts-list">
                            {dataLoaded ? (
                                <div className="comments-area">
                                    <h4>Calls</h4>
                                    <button type="button" className="boxed-btn" onClick={fetchCallsAndPatients} style={{ width: "100%", marginBottom: '25px' }}>Retrieve calls!</button>

                                    {calls?.map((call) => (
                                        <div key={call.id}>
                                            {call.is_new ?
                                                <div className="comment-list">
                                                    <div className="single-comment justify-content-between align-items-center d-flex">
                                                        <div className="desc justify-content-between align-items-center d-flex">

                                                            <div className="thumb">
                                                                <img src="img/comment/comment_1.png" alt="" />
                                                            </div>
                                                            <div className="desc">
                                                                <h5>
                                                                    <a href="#">
                                                                        {patients.map((patient) => (
                                                                            call.patient_id == patient.id ?
                                                                                patient.full_name
                                                                                :
                                                                                ""
                                                                        ))}
                                                                    </a>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        {/* {console.log("HEY", call.meeting_id)} */}
                                                        <div className="reply-btn">
                                                            <div className="btn-reply text-uppercase" onClick={() => handleOnCLick(call.id, call.meeting_id)}>Accept Call</div>
                                                            {/* {isShown && <Signaling callMeetingId={call.meeting_id} />} */}
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                ""
                                            }
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <PuffLoader
                                    color={"#24ab94"}
                                    cssOverride={override}
                                    size={100}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            )}
                            {showToast && <div id="toast">{toastMessage}</div>}
                        </div>
                    </div>
                </div>
            </section>
            {/* <Footer/> */}
        </>
    )
}
