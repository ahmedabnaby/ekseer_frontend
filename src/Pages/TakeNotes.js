import React, { useEffect, useState } from 'react'
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
    const [medication, setMedication] = useState(false)
    const [sickLeave, setSickLeave] = useState(false)

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
    
    useEffect(() => {
        fetchPatients();
    }, [])
    return (
        <div className="container" style={{ overflowY: 'scroll' }}>
            <div className="row">
                <div className="col-xl-8 col-md-6 col-lg-4 popup_box" style={{ marginTop: '0px' }} id='footer_contact_form'>
                    <h3 style={{ color: '#24ab94' }}>
                        You are writing the consultation to:
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
                    <form action="#">
                        <div className="row">
                            <div className="col-xl-12">
                                <textarea placeholder="Chief Complaint ..." required></textarea>
                            </div>
                            <div className="col-xl-12">
                                <textarea placeholder="History of Presenting Illness ..." required></textarea>
                            </div>
                            <div className="col-xl-12">
                                <textarea placeholder="Review of Systems ..." required></textarea>
                            </div>
                            <div className="col-xl-12">
                                <textarea placeholder="Examination ..." required></textarea>
                            </div>
                            <div className="col-xl-12">
                                <textarea placeholder="Assessment/Plan ..." required></textarea>
                            </div>
                            <div className="col-xl-12">
                                <label htmlFor='medic'>Prescribe Medication</label>
                                <div className='container row'>
                                    &nbsp; <input className='radioReset' type="radio" id="yes" name="yesOrNo" defaultValue="YES" onChange={medic} />
                                    &nbsp; <label htmlFor="yes">Yes</label>
                                    &nbsp;&nbsp;&nbsp; <input className='radioReset' type="radio" id="no" name="yesOrNo" defaultValue="NO" onChange={medic} required />
                                    &nbsp;&nbsp; <label htmlFor="no">No</label>
                                </div>
                                {medication && <textarea id='medic' placeholder="Write the full prescription medications ..." required></textarea>}
                            </div>
                            <div className="col-xl-12">
                                <div className='container row'>
                                    <h5 style={{marginBottom:'10px'}}>We can help you order medics from here, choose your OS and download
                                    <span style={{color:"#24ab94"}}> Anat App </span>now!</h5>
                                    <a href='https://play.google.com/store/apps/details?id=com.lean.practitioner' target='_blank'>
                                        <img src={process.env.PUBLIC_URL + '/img/icons/google-play.png'} style={{ width: '45px' }} />
                                    </a>
                                    <a href='https://apps.apple.com/sa/app/anat-%D8%A3%D9%86%D8%A7%D8%A9/id1472911277' target='_blank'>
                                        <img src={process.env.PUBLIC_URL + '/img/icons/app-store.png'} style={{ width: '35px', position: 'relative', top: '5px', left: '25px' }} />
                                    </a>
                                </div>
                            </div>
                            <div className="col-xl-12 mt-3">
                                <label htmlFor='sick'>Prescribe Sick-leave</label>
                                <div className='container row'>
                                    &nbsp; <input className='radioReset' type="radio" id="yes" name="yesOrNo1" defaultValue="YES" onChange={sick} />
                                    &nbsp; <label htmlFor="yes">Yes</label>
                                    &nbsp;&nbsp;&nbsp; <input className='radioReset' type="radio" id="no" name="yesOrNo1" defaultValue="NO" onChange={sick} required />
                                    &nbsp;&nbsp; <label htmlFor="no">No</label>
                                </div>
                                {sickLeave && <input id='sick' type='number' placeholder="How many days?" required/>}
                            </div>
                            <div className="col-xl-12">
                                <button type="submit" className="boxed-btn mt-4" style={{ width: "100%" }}>Save Consultation</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}