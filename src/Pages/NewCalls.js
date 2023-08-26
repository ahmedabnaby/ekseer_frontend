import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Signaling from "../Signaling";
import Footer from "../Includes/Footer"


export const NewCalls = () => {
    const location = useLocation();
    const [meetingId, setMeetingId] = useState("");

    var user = null;
    if (location.state == null) {
        user = null;
    }
    else {
        user = location.state.setUser;
    }
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    // const BASE_URL = 'https://ekseer.pythonanywhere.com/authentication-api';
    const [calls, setCalls] = useState([]);
    const [patients, setPatients] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isShown, setIsShown] = useState(false);
    const fetchNewCalls = async () => {
        await axios.get(`${BASE_URL}/calls/`).then((response) => {
            setDataLoaded(true);
            setCalls(response.data);
            showToastMessage("Call retrieved successfully!");

        })
        // setTimeout(()=>fetchNewCalls, 5000)
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
    const handleOnCLick = async (id) => {
        console.log(id)
        var bodyFormData = new FormData();
        var doctor_id = location.state.setUser.id
        bodyFormData.append("meeting_id", meetingId);
        bodyFormData.append("doctor_id", doctor_id);
        bodyFormData.append("is_new", false);
        console.log(bodyFormData)
        axios({
            method: "put",
            url: `${BASE_URL}/update-call/${id}/`,
            data: bodyFormData,
            headers: { "Content-Type": "application/json" },
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                console.log(response);
            });
        setIsShown(current => !current);
    }

    const fetchCallsAndPatients = () =>{
        fetchNewCalls()
        fetchPatients()
    }
    useEffect(() => {
        fetchCallsAndPatients()
        // const intervalId = setInterval(() => {
        //     fetchNewCalls(); // Load data every 6 sec (adjust the interval as needed)
        // }, 16000); // 6 sec in milliseconds

        // return () => clearInterval(intervalId);
    }, []);
    return (
        <>
        <section className="blog_area single-post-area">
            {/* {console.log(patients)} */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 posts-list">
                        {dataLoaded ? (
                            <div className="comments-area">
                                <h4>Calls</h4>
                                <button type="button" className="boxed-btn" onClick={fetchCallsAndPatients} style={{ width: "100%", marginBottom:'25px' }}>Retrieve calls!</button>

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
                                                        <div className="btn-reply text-uppercase" onClick={() => handleOnCLick(call.id)}>Accept Call</div>
                                                        {isShown && <Signaling callMeetingId={call.meeting_id} />}
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
                            <div>Loading...</div>
                        )}
                        {showToast && <div id="toast">{toastMessage}</div>}
                    </div>
                </div>
            </div>
        </section>
            <Footer/>
            </>
    )
}
