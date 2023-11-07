import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import PuffLoader from "react-spinners/PuffLoader";

export const NewCalls = () => {
    const { state } = useLocation();

    const override = {
        position: "absolute",
        top: "45vh",
        bottom: "0",
        right: "0",
        left: "0",
        margin: "0px auto"
    };

    const nav = useNavigate();


    // const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';

    const [calls, setCalls] = useState([]);
    const [patients, setPatients] = useState([]);
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
                    }
                    i++
                }
            })
    }
    const fetchPatients = async () => {
        await axios.get(`${BASE_URL}/users/`).then((response) => {
            setDataLoaded(true);
            setPatients(response.data);
        })
    }
    const handleOnCLick = async (id, meeting_id) => {
        var bodyFormData = new FormData();
        var doctor_id = state.loggedInUser.id
        bodyFormData.append("meeting_id", meeting_id);
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
                        meeting_id: meeting_id,
                        patient_id: response.data.patient_id,
                        call_id:id,
                    }
                });
                localStorage.setItem('doctorTime', new Date().getMinutes());
            })
            .catch(function (response) {
            });
    }

    const fetchCallsAndPatients = () => {
        fetchNewCalls()
        fetchPatients()
    }
    const getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    const getDateAndTime = (dateString) => {
        var today = new Date();
        var createdAt = new Date(dateString);
        // console.log(today.getMinutes())
        // console.log(createdAt.getMinutes())
        // var age = today.getSeconds() - secondsNow.getSeconds();
        // var m = today.getMinutes() - secondsNow.getMinutes();
        // if (m < 0 || (m === 0 && today.getDate() < secondsNow.getDate())) {
        //     age--;
        // }
        var currentMinutes = today.getMinutes() - createdAt.getMinutes()
        // console.log(currentMinutes)
        return currentMinutes
        // return age;
    }
    useEffect(() => {
        const interval = setInterval(() => {
            fetchCallsAndPatients();
        }, 2000)
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
                                    {!newCalls ?
                                        <h5>No upcoming calls yet!</h5>
                                        :
                                        ""
                                    }
                                    {/* <button type="button" className="boxed-btn" onClick={fetchCallsAndPatients} style={{ width: "100%", marginBottom: '25px' }}>Retrieve calls!</button> */}
                                    {calls?.map((call) => (
                                        <div key={call.id}>
                                            {call.is_new ?
                                                <div className="comment-list">
                                                    <div className="single-comment justify-content-between align-items-center d-flex">
                                                        <div className="desc justify-content-between align-items-center d-flex">
                                                            <div className="desc">
                                                                <h5>
                                                                    <span>
                                                                        {patients.map((patient) => (
                                                                            call.patient_id == patient.id ?
                                                                                <div key={patient.id}>
                                                                                    <span style={{fontSize:'16px', color:'#993f95'}}>{patient.full_name}</span>
                                                                                    <br/>
                                                                                    <span style={{fontSize:'12px', color:'#26a994'}}>Age: {getAge(patient.date_of_birth)}</span>
                                                                                </div>
                                                                                :
                                                                                ""
                                                                        ))}
                                                                    </span>
                                                                    <br />
                                                                    <span style={{position:'relative', top:'-5px'}}>
                                                                        {getDateAndTime(call.created_at) >= 0 ? getDateAndTime(call.created_at) + " minute(s) ago" : "More than a hour ago"}
                                                                    </span>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                        <div className="reply-btn">
                                                            <div className="btn-reply text-uppercase" onClick={() => handleOnCLick(call.id, call.meeting_id)}>Accept Call</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                ""
                                            }
                                        </div>
                                    ))}
                                </div>
                            ) :
                                <PuffLoader
                                    color={"#24ab94"}
                                    cssOverride={override}
                                    size={100}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            }
                        </div>
                    </div>
                </div>
            </section>
            {/* <Footer/> */}
        </>
    )
}
