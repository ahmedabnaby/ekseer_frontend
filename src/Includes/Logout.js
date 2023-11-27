import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BASE_URL = 'https://ekseer-backend.alsahaba.sa/authentication-api';
// const BASE_URL = 'https://ekseer-backend.alsahaba.sa/authentication-api';

const Logout = () => {
    const { state } = useLocation();
    const nav = useNavigate();

    const logout = async () => {
        await axios({
            method: "post",
            url: `${BASE_URL}/logout-all/`,
            headers: { "Authorization": `Token ${state.logInToken}` },
        })
            .then(function (response) {
                nav("/");
                window.location.reload()
            })
            .catch(function (response) {
                console.log(response)
            });
    }


    useEffect(() => {
        logout()
    });
}
export default Logout;
