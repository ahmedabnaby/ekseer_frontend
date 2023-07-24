import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Login() {
    const BASE_URL = 'https://ekseer.pythonanywhere.com/authentication-api';
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState(null);
    const nav = useNavigate();
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
                console.log(response.data.user);
                setUser(response.data.user);
                nav("/",{
                    state: {
                        setUser: response.data.user,
                    }
                  });
                console.log(response);
            })
            .catch(function (response) {
                console.log(response)
                if (response.response.data.non_field_errors) {
                    setErrors(response.response.data.non_field_errors[0])
                }
                else {
                    return;
                }
            });

        };
        useEffect(() => {
            console.log(user)
        });
    return (
        <div className="book_apointment_area">
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-lg-7">
                        <div className="popup_box ">
                            <div className="popup_inner">
                                <h3>
                                    Login
                                    <span>Here!</span>
                                </h3>
                                <form onSubmit={handleSubmit}>
                                    <p className="error">{errors.length > 0 ? `${errors}` : ""}</p>
                                    <div className="row">
                                        <div className="col-xl-6">
                                            <label htmlFor="iqama_number">ID/Iqama Number</label>
                                            <input type="text" name="iqama_number" id="iqama_number" placeholder="Identification or Iqama number" required />
                                        </div>
                                        <div className="col-xl-12">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" className="password" placeholder="Password" id="password" required />
                                        </div>
                                        <div className="col-xl-12">
                                            <button type="submit" className="boxed-btn mt-4" style={{ width: "100%" }}>Login in</button>
                                        </div>
                                        <div className="container mt-4">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12">
                                                    <p className="copy_right text-left">
                                                        New user? Register
                                                        <a href="/register" style={{ color: "#ba8abb" }}> here</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;
