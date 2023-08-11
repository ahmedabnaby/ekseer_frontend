import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
function DoctorsList() {
    const location = useLocation();
    const nav = useNavigate();
    console.log(location.state)
    var user = null;
    if (location.state == null) {
        user = null;
    }
    else {
        user = location.state.setUser;
    }
    const [currectUser, setCurrectUser] = useState(null);
    const navigateWithData = () => {
        setCurrectUser(user);
        nav("/video-room", {
            state: {
                setCurrectUser: user,
            }
        });
    }
    // const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    const BASE_URL = 'https://ekseer.pythonanywhere.com/authentication-api';
    const [doctors, setDoctors] = useState([]);
    const fetchAvailableDoctors = async () => {
        await axios.get(`${BASE_URL}/users/`).then((response) => {
            setDoctors(response.data);
        })
    }
    useEffect(() => {
        fetchAvailableDoctors()
    }, []);
    return (
        <section className="blog_area single-post-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 posts-list">

                        <div className="comments-area">
                            <h4>Available Doctors</h4>
                            {doctors.map((doctor) => (
                                <div key={doctor.id}>
                                    {doctor.is_doctor ?
                                        <div className="comment-list">
                                            {console.log(doctor)}
                                            <div className="single-comment justify-content-between d-flex">
                                                <div className="user justify-content-between d-flex">
                                                    <div className="thumb">
                                                        <img src="img/comment/comment_1.png" alt="" />
                                                    </div>
                                                    <div className="desc">
                                                        <p className="comment">
                                                            Multiply sea night grass fourth day sea lesser rule open subdue female fill which them
                                                            Blessed, give fill lesser bearing multiply sea night grass fourth day sea lesser
                                                        </p>
                                                        <div className="d-flex justify-content-between">
                                                            <div className="d-flex align-items-center">
                                                                <h5>
                                                                    <a href="#">{doctor.full_name}</a>
                                                                </h5>
                                                                <p className="date">December 4, 2017 at 3:12 pm </p>
                                                            </div>
                                                            <div className="reply-btn">
                                                                <div onClick={navigateWithData} className="btn-reply text-uppercase">Call</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        ""
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
export default DoctorsList;