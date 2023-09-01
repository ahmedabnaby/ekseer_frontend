import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { UpdateConsultation } from './UpdateConsultation';

export const DoctorConsultation = () => {
    const { state } = useLocation();
    const [consultations, setConsultations] = useState([]);
    const [newConsultations, setNewConsultations] = useState(false);
    const [visible, setVisibility] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState("");
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

    const closePopup = () => {
        setVisibility(false);
    };
    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('en-US', options);

        // Split the formatted date into day, month, and year parts
        const [month, day, year] = formattedDate.split(' ');

        // Convert the month abbreviation to uppercase
        const capitalizedMonth = month.toUpperCase();

        // Return the formatted date with uppercase month abbreviation and desired format
        return `${day} ${capitalizedMonth} ${year}`;
    }

    const showConsultation = (consultaion) => {
        setVisibility(true)
        setSelectedConsultation(consultaion)
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
            <div className="section-top-border">
                {/* <h2 className="mb-30">Table</h2> */}
                <div className="progress-table-wrap">
                    {!newConsultations ?
                        <h5 className='ml-4'>No consultations yet!</h5>
                        :
                        <div className="progress-table">
                            <div className="table-head">
                                <div className="serial">#</div>
                                <div className="country">Patient Name</div>
                                <div className="visit">Date</div>
                            </div>
                            {consultations && consultations?.filter(consultation => consultation.doctor_id == state.loggedInUser.id).map((filteredConsultation, index) => (
                                <div key={filteredConsultation.id}>
                                    {
                                        <>
                                            <div className="table-row" onClick={() => showConsultation(filteredConsultation)}>
                                                <div className="serial">
                                                    <span style={{ color: "#953E92" }}>{index + 1}</span>
                                                </div>
                                                {patients?.filter(patient => filteredConsultation.patient_id == patient.id).map((filteredPatient) => (
                                                    <div className="country" key={filteredPatient.id}>{filteredPatient.full_name}</div>
                                                ))}
                                                <div className="visit">{formatDate(filteredConsultation.created_at)}</div>
                                            </div>
                                            {console.log(filteredConsultation)}
                                        </>
                                    }
                                    {visible && <ShowSelectedConsultation consultation={selectedConsultation} handleClose={closePopup} />}
                                </div>

                            )
                            )}
                        </div>
                    }

                </div>
            </div>
            {/* <div className="depertment_area">
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
            </div> */}
        </>
    )
}

const ShowSelectedConsultation = ({ consultation, handleClose }) => {
    console.log(consultation)
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    const { state } = useLocation();
    const [patients, setPatients] = useState([]);
    const [visibleUpdateConsultations, setVisibleUpdateConsultations] = useState(false);
    const fetchPatients = async () => {
        await axios.get(`${BASE_URL}/users/`).then((response) => {
            setPatients(response.data);
        })
    }
    const modalRef = useRef(null);

    const closeWithAnimation = () => {
        if (modalRef.current) {
            modalRef.current.classList.add("closing");
            modalRef.current.classList.remove("closing");
            handleClose();
        }
    }
    const showUpdateConsultation = () => {
        setVisibleUpdateConsultations(true)
    }
    useEffect(() => {
        fetchPatients();
    }, []);

    return (
        <div className="depertment_area" ref={modalRef}>
            <div className='graphpop pops' style={{ overflowY: 'scroll' }}>
                <div className="container content customContentPopUp2" id="mizo">
                    <div className="cancel-btn">
                        <img src="img/icons/cancel.png" id="cancel-here" onClick={closeWithAnimation} />
                    </div>
                    <div className="dept_main_info">
                        <div className="tab-content" id="myTabContent">
                            <div className="row align-items-center">
                                <div className='card mb-5'>
                                    <div className="col-lg-7">
                                        <div className="dept_info">
                                            <h3>Viewing of consultaion of Patient: &nbsp;
                                                <span style={{ color: '#953E92' }}>
                                                    {patients.filter(patient => consultation.patient_id == patient.id).map((patient) => (
                                                        patient.full_name
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
                                        </div>
                                    </div>
                                    {visibleUpdateConsultations && <UpdateConsultation consultation={consultation} id={consultation.id} patient_id={consultation.patient_id} loggedInUser={state.loggedInUser} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}