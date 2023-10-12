import React, { Component, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import Footer from "../Includes/Footer"

function DoctorRegister() {
    // const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';

    const [copyOfIqamaErrors, setcopyOfIqamaErrors] = useState([]);
    const [emailErrors, setEmailErrors] = useState([]);
    const [birthDateError, setBirthDateError] = useState(false);
    const [iqamaNumberErrors, setIqamaNumberErrors] = useState([]);
    const [mobileNumberErrors, setMobileNumberErrors] = useState([]);

    const nav = useNavigate();
    const { state } = useLocation();


    const [visible, setVisible] = useState(false);

    const Popup = ({ handleClose }) => {

        const modalRef = useRef(null);

        const closeWithAnimation = () => {
            if (modalRef.current) {
                modalRef.current.classList.add("closing");
                modalRef.current.classList.remove("closing");
                handleClose();
                nav("/login")
            }
        }; return (
            <div ref={modalRef} className="graphpop">
                <div className="content">
                    <div className="logo-img">
                        <a href="/">
                            <img src="img/icons/double-check.gif" alt="" />
                        </a>
                    </div>
                    <h2><span style={{ color: "#ba8abb" }}>User</span> created <span style={{ color: "#24ab94" }}>successfully!</span></h2>
                    <div className="cancel-btn">
                        <img src="img/icons/cancel.png" id="cancel-here" onClick={closeWithAnimation} />
                    </div>
                </div>
                {setTimeout(() => {
                    nav("/login")
                }, 2000)}
            </div>
        );
    };

    const showPopup = () => {
        setVisible(true);
    };
    const closePopup = () => {
        setVisible(false);
    };
    const datePickerValidate = (e) => {
        console.log(e.target.value)
        const currentYear = new Date().getFullYear();
        const year = e.target.value.split("-")[0];
        const age = currentYear - year;
        if (age < 18) {
            setBirthDateError(true)
        } else {
            setBirthDateError(false)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.append("full_name", e.target.full_name.value);
        bodyFormData.append("iqama_number", e.target.iqama_number.value);
        bodyFormData.append("password", e.target.password.value);
        bodyFormData.append("copy_of_iqama_number", e.target.copy_of_iqama.files[0]);
        bodyFormData.append("scfhs_registration", e.target.scfhs_number.value);
        bodyFormData.append("copy_of_scfhs_registration_card", e.target.scfhs_card.files[0]);
        bodyFormData.append("cv", e.target.cv.files[0]);
        bodyFormData.append("personal_photo", e.target.personal_photo.files[0]);
        bodyFormData.append("date_of_birth", e.target.birth_date.value);
        bodyFormData.append("mobile_number", e.target.mobile_number.value);
        bodyFormData.append("email", e.target.email.value);
        bodyFormData.append("nationality", e.target.nationality.value);
        bodyFormData.append("is_doctor", true);
        axios({
            method: "post",
            url: `${BASE_URL}/register/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                showPopup()
            })
            .catch(function (response) {
                if (response.response.data.email) {
                    setEmailErrors(response.response.data.email[0])
                }
                if (response.response.data.iqama_number) {
                    setIqamaNumberErrors(response.response.data.iqama_number[0])
                }
                if (response.response.data.mobile_number) {
                    setMobileNumberErrors(response.response.data.mobile_number[0])
                }
                if (response.response.data.copy_of_iqama_number) {
                    setcopyOfIqamaErrors(response.response.data.copy_of_iqama_number[0])
                }
                else {
                    console.log("Good to go!")
                }
            });

    };
    return (
        <div className="book_apointment_area">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="popup_box ">
                            <div className="popup_inner">
                                <h3>
                                    Register as a doctor
                                    <span>Here!</span>
                                    <p>Note: All of the fields are required!</p>
                                </h3>
                                <form onSubmit={handleSubmit} encType="multipart/form-data" id="reg_form">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <label htmlFor="full_name">Your Full Name</label>
                                            <input type="text" name="full_name" id="full_name" placeholder="Full Name" required />
                                        </div>
                                        <div className="col-xl-12">
                                            <label htmlFor="password">Your Password</label>
                                            <input type="password" name="password" id="password" className="password" placeholder="Password" required />
                                        </div>
                                        <div className="col-xl-6">
                                            <label htmlFor="iqama_number">ID/Iqama Number</label>
                                            {iqamaNumberErrors.length > 0 ? <p className="error">This ID/Iqama number already exists!</p> : ''}
                                            <input type="text" name="iqama_number" id="iqama_number" placeholder="Identification or Iqama number" required />
                                        </div>
                                        <div className="col-xl-6">
                                            <label htmlFor="copy_of_iqama">Copy of ID/Iqama</label>
                                            <p className="error">{copyOfIqamaErrors.length > 0 ? `${copyOfIqamaErrors}` : ""}</p>
                                            <input type="file" name="copy_of_iqama" id="copy_of_iqama" required />
                                        </div>
                                        <div className="col-xl-6">
                                            <label htmlFor="scfhs_number">SCFHS Registration #</label>
                                            <input type="text" name="scfhs_number" id="scfhs_number" placeholder="SCFHS Registration number" required />
                                        </div>
                                        <div className="col-xl-6">
                                            <label htmlFor="scfhs_card">Copy of SCFHS Registration Card</label>
                                            {/* <p className="error">{copyOfIqamaErrors.length > 0 ? `${copyOfIqamaErrors}` : ""}</p> */}
                                            <input type="file" name="scfhs_card" id="scfhs_card" required />
                                        </div>
                                        <div className="col-xl-6">
                                            <label htmlFor="email">Your Email Address</label>
                                            {emailErrors.length > 0 ? <p className="error">This E-mail address already exists!</p> : ''}
                                            <input type="email" name="email" id="email" placeholder="Email Address" required />
                                        </div>
                                        <div className="col-xl-6">
                                            <label htmlFor="mobile_number">Your Mobile Number (must be 9 digits long)</label>
                                            {mobileNumberErrors.length > 0 ? <p className="error">The mobile number should start with '5'!</p> : ''}
                                            <input type="number" id="mobile_number" name="mobile_number" placeholder="Ex: 564234532" required />
                                        </div>
                                        <div className="col-xl-12">
                                            <label htmlFor="birth_date">Your Date of Birth</label>
                                            {/* {birthDateError && <p className="error">Your Date of Birth indicates that you are below 18 years,
                                                According to the Ministry of Health bylaws, your legal guardian must accompany you During the Tele-consultation!
                                            </p>} */}
                                            <input type="date" name="birth_date" onChange={datePickerValidate} id="birth_date" className="example-custom-input" placeholder="YYYY-MM-DD" required />
                                        </div>
                                        <div className="col-xl-12">
                                            <label htmlFor="default-select">Your Nationality</label>
                                            <select className="form-select wide nice-select" name="nationality" id="default-select" required>
                                                <option value="SA">Saudi Arabia</option>
                                                <option value="AF">Afghanistan</option>
                                                <option value="AX">Åland Islands</option>
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AS">American Samoa</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AO">Angola</option>
                                                <option value="AI">Anguilla</option>
                                                <option value="AQ">Antarctica</option>
                                                <option value="AG">Antigua and Barbuda</option>
                                                <option value="AR">Argentina</option>
                                                <option value="AM">Armenia</option>
                                                <option value="AW">Aruba</option>
                                                <option value="AU">Australia</option>
                                                <option value="AT">Austria</option>
                                                <option value="AZ">Azerbaijan</option>
                                                <option value="BS">Bahamas</option>
                                                <option value="BH">Bahrain</option>
                                                <option value="BD">Bangladesh</option>
                                                <option value="BB">Barbados</option>
                                                <option value="BY">Belarus</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BZ">Belize</option>
                                                <option value="BJ">Benin</option>
                                                <option value="BM">Bermuda</option>
                                                <option value="BT">Bhutan</option>
                                                <option value="BO">Bolivia, Plurinational State of</option>
                                                <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                                <option value="BA">Bosnia and Herzegovina</option>
                                                <option value="BW">Botswana</option>
                                                <option value="BV">Bouvet Island</option>
                                                <option value="BR">Brazil</option>
                                                <option value="IO">British Indian Ocean Territory</option>
                                                <option value="BN">Brunei Darussalam</option>
                                                <option value="BG">Bulgaria</option>
                                                <option value="BF">Burkina Faso</option>
                                                <option value="BI">Burundi</option>
                                                <option value="KH">Cambodia</option>
                                                <option value="CM">Cameroon</option>
                                                <option value="CA">Canada</option>
                                                <option value="CV">Cape Verde</option>
                                                <option value="KY">Cayman Islands</option>
                                                <option value="CF">Central African Republic</option>
                                                <option value="TD">Chad</option>
                                                <option value="CL">Chile</option>
                                                <option value="CN">China</option>
                                                <option value="CX">Christmas Island</option>
                                                <option value="CC">Cocos (Keeling) Islands</option>
                                                <option value="CO">Colombia</option>
                                                <option value="KM">Comoros</option>
                                                <option value="CG">Congo</option>
                                                <option value="CD">Congo, the Democratic Republic of the</option>
                                                <option value="CK">Cook Islands</option>
                                                <option value="CR">Costa Rica</option>
                                                <option value="CI">Côte d'Ivoire</option>
                                                <option value="HR">Croatia</option>
                                                <option value="CU">Cuba</option>
                                                <option value="CW">Curaçao</option>
                                                <option value="CY">Cyprus</option>
                                                <option value="CZ">Czech Republic</option>
                                                <option value="DK">Denmark</option>
                                                <option value="DJ">Djibouti</option>
                                                <option value="DM">Dominica</option>
                                                <option value="DO">Dominican Republic</option>
                                                <option value="EC">Ecuador</option>
                                                <option value="EG">Egypt</option>
                                                <option value="SV">El Salvador</option>
                                                <option value="GQ">Equatorial Guinea</option>
                                                <option value="ER">Eritrea</option>
                                                <option value="EE">Estonia</option>
                                                <option value="ET">Ethiopia</option>
                                                <option value="FK">Falkland Islands (Malvinas)</option>
                                                <option value="FO">Faroe Islands</option>
                                                <option value="FJ">Fiji</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="GF">French Guiana</option>
                                                <option value="PF">French Polynesia</option>
                                                <option value="TF">French Southern Territories</option>
                                                <option value="GA">Gabon</option>
                                                <option value="GM">Gambia</option>
                                                <option value="GE">Georgia</option>
                                                <option value="DE">Germany</option>
                                                <option value="GH">Ghana</option>
                                                <option value="GI">Gibraltar</option>
                                                <option value="GR">Greece</option>
                                                <option value="GL">Greenland</option>
                                                <option value="GD">Grenada</option>
                                                <option value="GP">Guadeloupe</option>
                                                <option value="GU">Guam</option>
                                                <option value="GT">Guatemala</option>
                                                <option value="GG">Guernsey</option>
                                                <option value="GN">Guinea</option>
                                                <option value="GW">Guinea-Bissau</option>
                                                <option value="GY">Guyana</option>
                                                <option value="HT">Haiti</option>
                                                <option value="HM">Heard Island and McDonald Islands</option>
                                                <option value="VA">Holy See (Vatican City State)</option>
                                                <option value="HN">Honduras</option>
                                                <option value="HK">Hong Kong</option>
                                                <option value="HU">Hungary</option>
                                                <option value="IS">Iceland</option>
                                                <option value="IN">India</option>
                                                <option value="ID">Indonesia</option>
                                                <option value="IR">Iran, Islamic Republic of</option>
                                                <option value="IQ">Iraq</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IM">Isle of Man</option>
                                                <option value="IL">Israel</option>
                                                <option value="IT">Italy</option>
                                                <option value="JM">Jamaica</option>
                                                <option value="JP">Japan</option>
                                                <option value="JE">Jersey</option>
                                                <option value="JO">Jordan</option>
                                                <option value="KZ">Kazakhstan</option>
                                                <option value="KE">Kenya</option>
                                                <option value="KI">Kiribati</option>
                                                <option value="KP">Korea, Democratic People's Republic of</option>
                                                <option value="KR">Korea, Republic of</option>
                                                <option value="KW">Kuwait</option>
                                                <option value="KG">Kyrgyzstan</option>
                                                <option value="LA">Lao People's Democratic Republic</option>
                                                <option value="LV">Latvia</option>
                                                <option value="LB">Lebanon</option>
                                                <option value="LS">Lesotho</option>
                                                <option value="LR">Liberia</option>
                                                <option value="LY">Libya</option>
                                                <option value="LI">Liechtenstein</option>
                                                <option value="LT">Lithuania</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MO">Macao</option>
                                                <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                                                <option value="MG">Madagascar</option>
                                                <option value="MW">Malawi</option>
                                                <option value="MY">Malaysia</option>
                                                <option value="MV">Maldives</option>
                                                <option value="ML">Mali</option>
                                                <option value="MT">Malta</option>
                                                <option value="MH">Marshall Islands</option>
                                                <option value="MQ">Martinique</option>
                                                <option value="MR">Mauritania</option>
                                                <option value="MU">Mauritius</option>
                                                <option value="YT">Mayotte</option>
                                                <option value="MX">Mexico</option>
                                                <option value="FM">Micronesia, Federated States of</option>
                                                <option value="MD">Moldova, Republic of</option>
                                                <option value="MC">Monaco</option>
                                                <option value="MN">Mongolia</option>
                                                <option value="ME">Montenegro</option>
                                                <option value="MS">Montserrat</option>
                                                <option value="MA">Morocco</option>
                                                <option value="MZ">Mozambique</option>
                                                <option value="MM">Myanmar</option>
                                                <option value="NA">Namibia</option>
                                                <option value="NR">Nauru</option>
                                                <option value="NP">Nepal</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="NC">New Caledonia</option>
                                                <option value="NZ">New Zealand</option>
                                                <option value="NI">Nicaragua</option>
                                                <option value="NE">Niger</option>
                                                <option value="NG">Nigeria</option>
                                                <option value="NU">Niue</option>
                                                <option value="NF">Norfolk Island</option>
                                                <option value="MP">Northern Mariana Islands</option>
                                                <option value="NO">Norway</option>
                                                <option value="OM">Oman</option>
                                                <option value="PK">Pakistan</option>
                                                <option value="PW">Palau</option>
                                                <option value="PS">Palestinian Territory, Occupied</option>
                                                <option value="PA">Panama</option>
                                                <option value="PG">Papua New Guinea</option>
                                                <option value="PY">Paraguay</option>
                                                <option value="PE">Peru</option>
                                                <option value="PH">Philippines</option>
                                                <option value="PN">Pitcairn</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="PR">Puerto Rico</option>
                                                <option value="QA">Qatar</option>
                                                <option value="RE">Réunion</option>
                                                <option value="RO">Romania</option>
                                                <option value="RU">Russian Federation</option>
                                                <option value="RW">Rwanda</option>
                                                <option value="BL">Saint Barthélemy</option>
                                                <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                                <option value="KN">Saint Kitts and Nevis</option>
                                                <option value="LC">Saint Lucia</option>
                                                <option value="MF">Saint Martin (French part)</option>
                                                <option value="PM">Saint Pierre and Miquelon</option>
                                                <option value="VC">Saint Vincent and the Grenadines</option>
                                                <option value="WS">Samoa</option>
                                                <option value="SM">San Marino</option>
                                                <option value="ST">Sao Tome and Principe</option>
                                                <option value="SN">Senegal</option>
                                                <option value="RS">Serbia</option>
                                                <option value="SC">Seychelles</option>
                                                <option value="SL">Sierra Leone</option>
                                                <option value="SG">Singapore</option>
                                                <option value="SX">Sint Maarten (Dutch part)</option>
                                                <option value="SK">Slovakia</option>
                                                <option value="SI">Slovenia</option>
                                                <option value="SB">Solomon Islands</option>
                                                <option value="SO">Somalia</option>
                                                <option value="ZA">South Africa</option>
                                                <option value="GS">South Georgia and the South Sandwich Islands</option>
                                                <option value="SS">South Sudan</option>
                                                <option value="ES">Spain</option>
                                                <option value="LK">Sri Lanka</option>
                                                <option value="SD">Sudan</option>
                                                <option value="SR">Suriname</option>
                                                <option value="SJ">Svalbard and Jan Mayen</option>
                                                <option value="SZ">Swaziland</option>
                                                <option value="SE">Sweden</option>
                                                <option value="CH">Switzerland</option>
                                                <option value="SY">Syrian Arab Republic</option>
                                                <option value="TW">Taiwan, Province of China</option>
                                                <option value="TJ">Tajikistan</option>
                                                <option value="TZ">Tanzania, United Republic of</option>
                                                <option value="TH">Thailand</option>
                                                <option value="TL">Timor-Leste</option>
                                                <option value="TG">Togo</option>
                                                <option value="TK">Tokelau</option>
                                                <option value="TO">Tonga</option>
                                                <option value="TT">Trinidad and Tobago</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="TR">Turkey</option>
                                                <option value="TM">Turkmenistan</option>
                                                <option value="TC">Turks and Caicos Islands</option>
                                                <option value="TV">Tuvalu</option>
                                                <option value="UG">Uganda</option>
                                                <option value="UA">Ukraine</option>
                                                <option value="AE">United Arab Emirates</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="US">United States</option>
                                                <option value="UM">United States Minor Outlying Islands</option>
                                                <option value="UY">Uruguay</option>
                                                <option value="UZ">Uzbekistan</option>
                                                <option value="VU">Vanuatu</option>
                                                <option value="VE">Venezuela, Bolivarian Republic of</option>
                                                <option value="VN">Viet Nam</option>
                                                <option value="VG">Virgin Islands, British</option>
                                                <option value="VI">Virgin Islands, U.S.</option>
                                                <option value="WF">Wallis and Futuna</option>
                                                <option value="EH">Western Sahara</option>
                                                <option value="YE">Yemen</option>
                                                <option value="ZM">Zambia</option>
                                                <option value="ZW">Zimbabwe</option>

                                            </select>
                                        </div>
                                        <div className="col-xl-6">
                                            <label htmlFor="cv">CV/Resume</label>
                                            {/* <p className="error">{copyOfIqamaErrors.length > 0 ? `${copyOfIqamaErrors}` : ""}</p> */}
                                            <input type="file" name="cv" id="cv" required />
                                        </div>
                                        <div className="col-xl-6">
                                            <label htmlFor="personal_photo">Your Personal Photo</label>
                                            {/* <p className="error">{copyOfIqamaErrors.length > 0 ? `${copyOfIqamaErrors}` : ""}</p> */}
                                            <input type="file" name="personal_photo" id="personal_photo" required />
                                        </div>
                                        <div className="col-xl-12 mt-4">
                                            <div className="switch-wrap d-flex">
                                                <div className="primary-checkbox">
                                                    <input type="checkbox" id="primary-checkbox" required />
                                                    <label htmlFor="primary-checkbox" />
                                                </div>
                                                <p>By signing up you agree to our&nbsp;
                                                    <a href="#" style={{ color: "#ba8abb" }}> Terms & Conditions</a>
                                                </p>
                                            </div>
                                            {visible && <Popup handleClose={closePopup} />}
                                            <button type="submit" className="boxed-btn" style={{ width: "100%" }}>Sign up</button>
                                        </div>
                                        <div className="container mt-4">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12">
                                                    <p className="copy_right text-left">
                                                        Already have an account? Login&nbsp;
                                                        <a href="/doctor-login" style={{ color: "#ba8abb" }}> here</a>
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
            <Footer />
        </div>
    );
}

export default DoctorRegister;
