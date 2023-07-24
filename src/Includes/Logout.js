import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BASE_URL = 'https://ekseer.pythonanywhere.com/authentication-api';

function Logout() {
    const location = useLocation();
    const nav = useNavigate();
    const navOut = () => {
        nav("/");
    }

    console.log(location.state)
    if (location.state == null) {
        console.log("HERE")
        navOut()
    }
    else {
        var user = location.state.setUser;
        axios({
            method: "post",
            url: `${BASE_URL}/logout-all/`,
            headers: { "Authorization": `Token ${user.token}` },
        })
            .then(function (response) {
                //handle success
            })
            .catch(function (response) {
            });

    }


    useEffect(() => {
        navOut()
    });
}
export default Logout;
