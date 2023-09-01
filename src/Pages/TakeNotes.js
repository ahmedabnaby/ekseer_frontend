import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const TakeNotes = ({
    loggedInUser,
    patient_id
}) => {

    console.log(loggedInUser, patient_id)
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';

    // console.log(data)
    const [patients, setPatients] = useState([])
    const [consultations, setConsultations] = useState([])
    const [medication, setMedication] = useState(false)
    const [sickLeave, setSickLeave] = useState(false)

    const [visible, setVisible] = useState(false);

    const Popup = ({ handleClose }) => {
        const modalRef = useRef(null);

        const closeWithAnimation = () => {
            if (modalRef.current) {
                modalRef.current.classList.add("closing");
                modalRef.current.classList.remove("closing");
                handleClose();
            }
        }; return (
            <div ref={modalRef} className="graphpop">
                <div className="content">
                    <div className="logo-img">
                        <a href="/">
                            <img src="img/icons/double-check.gif" alt="" />
                        </a>
                    </div>
                    <h2><span style={{ color: "#ba8abb" }}>Consultation</span> saved <span style={{ color: "#24ab94" }}>successfully!</span></h2>
                    <div className="cancel-btn">
                        <img src="img/icons/cancel.png" id="cancel-here" onClick={closeWithAnimation} />
                    </div>
                </div>
            </div>
        );
    };
    const showPopup = () => {
        setVisible(true);
    };
    const closePopup = () => {
        setVisible(false);
    };
    const fetchPatients = async () => {
        await axios.get(`${BASE_URL}/users/`).then((response) => {
            setPatients(response.data);
        })
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

    const medic = (e) => {
        if (e.target.value === "YES") {
            setMedication(true)
        } else {
            setMedication(false)
        }
    }
    const sick = (e) => {
        if (e.target.value === "YES") {
            setSickLeave(true)
        } else {
            setSickLeave(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        var bodyFormData = new FormData();
        var doctor_id = loggedInUser.id
        bodyFormData.append("doctor_id", doctor_id);
        bodyFormData.append("patient_id", patient_id);
        bodyFormData.append("chief_complaint", e.target.chief_complaint.value);
        bodyFormData.append("history_of_illness", e.target.history_of_illness.value);
        bodyFormData.append("review_of_systems", e.target.review_of_systems.value);
        bodyFormData.append("examination", e.target.examination.value);
        bodyFormData.append("assessment", e.target.assessment.value);
        if (e.target.medication == undefined) {
            bodyFormData.append("medication", "No");
        }
        else {
            bodyFormData.append("medication", e.target.medication.value);
        }
        if (e.target.sick_leave == undefined) {
            bodyFormData.append("sick_leave", 0);
        }
        else {
            bodyFormData.append("sick_leave", e.target.sick_leave.value);
        }
        await axios({
            method: "post",
            url: `${BASE_URL}/create-consultation/`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                showPopup()
            })
            .catch(function (response) {
                console.log(response);
            });
    }
    useEffect(() => {
        fetchPatients();
    }, [])
    return (
        <div className="container" style={{ overflowY: 'scroll' }}>
            <div className="row">
                <div className="col-xl-8 col-md-6 col-lg-4 popup_box" style={{ marginTop: '0px' }} id='footer_contact_form'>
                    <h3 style={{ color: '#24ab94' }}>
                        You are writing consultation to:
                        <span style={{ color: "#953E92", fontSize: '18px' }}>
                            {patients.map((patient) => (
                                patient_id == patient.id ?
                                    <div key={patient.id}>
                                        Patient name: {patient.full_name}
                                        <br />
                                        Age: {getAge(patient.date_of_birth)}
                                    </div>
                                    :
                                    ""
                            ))}
                        </span>
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-xl-12">
                                <label>Chief Complaint:</label>
                                <textarea name='chief_complaint' placeholder="Chief Complaint ..." required></textarea>
                            </div>
                            <div className="col-xl-12">
                                <label>History of Presenting Illness:</label>
                                <textarea name='history_of_illness' placeholder="History of Presenting Illness ..." required></textarea>
                            </div>
                            <div className="col-xl-12">
                                <label>Review of Systems:</label>
                                <textarea name='review_of_systems' placeholder="Review of Systems ..." required></textarea>
                            </div>
                            <div className="col-xl-12">
                                <label>Examination:</label>
                                <textarea name='examination' placeholder="Examination ..." required></textarea>
                            </div>
                            <div className="col-xl-12">
                                <label>Assessment/Plan:</label>
                                <textarea name='assessment' placeholder="Assessment/Plan ..." required></textarea>
                            </div>
                            <div className="col-xl-12">
                                <label htmlFor='medic'>Prescribe Medication</label>
                                <div className='container row'>
                                    &nbsp; <input className='radioReset' type="radio" id="yes" name="yesOrNo" defaultValue="YES" onChange={medic} />
                                    &nbsp; <label htmlFor="yes">Yes</label>
                                    &nbsp;&nbsp;&nbsp; <input className='radioReset' type="radio" id="no" name="yesOrNo" defaultValue="NO" onChange={medic} required />
                                    &nbsp;&nbsp; <label htmlFor="no">No</label>
                                </div>
                                {medication &&
                                    <>
                                        <div className="col-xl-12">
                                            <textarea id='medic' name='medication' placeholder="Write the full prescription medications ..." required></textarea>
                                            <div className='container row'>
                                                <h5 style={{ marginBottom: '10px' }}>We can help you order medics from here, choose your OS and download
                                                    <span style={{ color: "#24ab94" }}> Anat App </span>now!</h5>
                                                <a href='https://play.google.com/store/apps/details?id=com.lean.practitioner' target='_blank'>
                                                    <img src={process.env.PUBLIC_URL + '/img/icons/google-play.png'} style={{ width: '45px' }} />
                                                </a>
                                                <a href='https://apps.apple.com/sa/app/anat-%D8%A3%D9%86%D8%A7%D8%A9/id1472911277' target='_blank'>
                                                    <img src={process.env.PUBLIC_URL + '/img/icons/app-store.png'} style={{ width: '35px', position: 'relative', top: '5px', left: '25px' }} />
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="col-xl-12 mt-3">
                                <label htmlFor='sick'>Prescribe Sick-leave</label>
                                <div className='container row'>
                                    &nbsp; <input className='radioReset' type="radio" id="yes1" name="yesOrNo1" defaultValue="YES" onChange={sick} />
                                    &nbsp; <label htmlFor="yes1">Yes</label>
                                    &nbsp;&nbsp;&nbsp; <input className='radioReset' type="radio" id="no1" name="yesOrNo1" defaultValue="NO" onChange={sick} required />
                                    &nbsp;&nbsp; <label htmlFor="no1">No</label>
                                </div>
                                {sickLeave && <input id='sick' name='sick_leave' type='number' placeholder="How many days?" required />}
                            </div>
                            <div className="col-xl-12">
                                <button type="submit" className="boxed-btn mt-4" style={{ width: "100%" }}>Save Consultation</button>
                            </div>
                            {visible && <Popup handleClose={closePopup} />}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}