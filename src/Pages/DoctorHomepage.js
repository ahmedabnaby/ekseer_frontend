import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from "../Includes/Footer"

function HomePage() {
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    // const BASE_URL = 'https://ekseer.pythonanywhere.com/authentication-api';
    const location = useLocation();
    const nav = useNavigate();
    var user = null;
    if (location.state == null) {
        user = null;
    }
    else {
        user = location.state.setUser;
    }
    const [currectUser, setUser] = useState(null);
    const [thisUser, setUsers] = useState(null);

    const navigateWithData = () => {
        setUser(user);
        nav("/calls", {
            state: {
                setUser: user,
            }
        });
    }
    const retrieveCurrentUser = async () => {
        await axios.get(`${BASE_URL}/users/`)
            .then((response) => {
                console.log(response)
                setUsers(response.data);
            })
    }
    useEffect(() => {
        retrieveCurrentUser()
    }, []);
    return (
        <div className="quality_area">
            <div className="container">
                <div className="row justify-content-center ">
                    <div className="col-lg-6">
                        {user === null || user === "New User" ? "" :
                            <h6 id='welcome-text'>Welcome {thisUser?.map((patient) => (
                                location.state.setUser.id == patient.id ?
                                    patient.full_name
                                    :
                                    ""
                            ))}</h6>
                        }
                        <div className="section_title mb-55 text-center">
                            <h3 className='mt-5'>Join us now!</h3>
                            <p>You must read our <a href="#" style={{color:"#BA8ABB"}}>prerequisites.</a>.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="single_quality">
                            <div className="icon" style={{backgroundImage:"-webkit-linear-gradient(90deg, #BA8ABB 0%, #BA8ABB 100%)"}}>
                                <i className="flaticon-doctor"></i>
                            </div>
                            <h3>Ready to receive calls?</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                            {user === null || user === "New User" ?
                                <a href="/register" style={{background:"#BA8ABB", border:'#BA8ABB'}} className="boxed-btn mt-4">Register now!</a>
                                :
                                <div className="boxed-btn mt-4" style={{background:"#BA8ABB", border:'#BA8ABB'}} onClick={navigateWithData}>Start accepting calls!</div>
                                // <NewCalls setLoggedInUser={location.state.setUser} />
                            }
                            <h6 className='mt-5'>Have an account? <a href='/login' style={{ color: "#ba8abb" }}> Login here!</a></h6>

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default HomePage;
