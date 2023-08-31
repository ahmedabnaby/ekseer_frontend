import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { UpdateConsultation } from './UpdateConsultation';

export const DoctorConsultation = () => {
    const { state } = useLocation();
    const [consultations, setConsultations] = useState([]);
    const [newConsultations, setNewConsultations] = useState(false);
    const [visibleUpdateConsultations, setVisibleUpdateConsultations] = useState(false);
    const [patients, setPatients] = useState([]);
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';

    const fetchConsultations = async () => {
        await axios.get(`${BASE_URL}/consultations/`)
            .then((response) => {
                setConsultations(response.data);
                var i = 0;
                while (i < response.data.length) {
                    if ((response.data[i] === false)) {
                        setNewConsultations(false);
                    }
                    else {
                        setNewConsultations(true);
                    }
                    i++
                }
            })
    }

    const fetchPatients = async () => {
        await axios.get(`${BASE_URL}/users/`).then((response) => {
            setPatients(response.data);
        })
    }

    const showUpdateConsultation = () => {
        setVisibleUpdateConsultations(true)
    }

    useEffect(() => {
        fetchConsultations();
        fetchPatients();
    }, []);

    return (
        <>
            <div className="bradcam_area breadcam_bg_1">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bradcam_text">
                                <h3>Consultations</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="depertment_area">
                <div className="container">
                    <div className="dept_main_info">
                        <div className="tab-content" id="myTabContent">
                            <div className="row align-items-center">
                                {consultations?.map((consultation) => (
                                    <div key={consultation.id}>
                                        {
                                            consultation.doctor_id == state.loggedInUser.id ?
                                                <div className='card mb-5'>
                                                    <div className="col-lg-7">
                                                        <div className="dept_info">
                                                            <h3>Applied consultation to: &nbsp;
                                                                <span style={{ color: '#953E92' }}>
                                                                    {patients.map((patient) => (
                                                                        consultation.patient_id == patient.id ?
                                                                            patient.full_name
                                                                            :
                                                                            ""
                                                                    ))}
                                                                </span>
                                                            </h3>
                                                            <div className='mt-4'>
                                                                <h5>Chief Complaint:</h5>
                                                                <p>{consultation.chief_complaint}</p>
                                                            </div>
                                                            <div className='mt-4'>
                                                                <h5>History of Illness:</h5>
                                                                <p>{consultation.history_of_illness}</p>
                                                            </div>
                                                            <div className='mt-4'>
                                                                <h5>Review of systems:</h5>
                                                                <p>{consultation.review_of_systems}</p>
                                                            </div>
                                                            <div className='mt-4'>
                                                                <h5>Examinations:</h5>
                                                                <p>{consultation.examination}</p>
                                                            </div>
                                                            <div className='mt-4'>
                                                                <h5>Assessments/Plans:</h5>
                                                                <p>{consultation.assessment}</p>
                                                            </div>
                                                            <div className='mt-4'>
                                                                <h5>Medication:</h5>
                                                                <p>{consultation.medication}</p>
                                                            </div>
                                                            <div className='mt-4'>
                                                                <h5>Sick leave:</h5>
                                                                <p>{consultation.sick_leave}</p>
                                                            </div>
                                                            <button onClick={showUpdateConsultation} className="boxed-btn">Update Consultation</button>
                                                            {visibleUpdateConsultations && <UpdateConsultation consultation={consultation} id={consultation.id} patient_id={consultation.patient_id} loggedInUser={state.loggedInUser} />}
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
            </div>
        </>
    )
}