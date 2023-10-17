import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { UpdateConsultation } from './UpdateConsultation';

export const DoctorConsultation = () => {
    const { state } = useLocation();
    const [consultations, setConsultations] = useState([]);
    const [newConsultations, setNewConsultations] = useState(false);
    const [visible, setVisibility] = useState(false);
    const [visiblePatient, setPatientVisibility] = useState(false);
    const [selectedConsultation, setSelectedConsultation] = useState("");
    const [selectedPatient, setSelectedPatient] = useState("");
    const [patients, setPatients] = useState([]);
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    var uniquePatients = []
    var uniqueDoctors = []
    var uniqueConsultations = []
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
    // const getUniqueDoctors = () => {
    //     for (var i = 0; i < patients.length; i++) {
    //         for (var j = 0; j < consultations.length; j++) {
    //             if (consultations[j].doctor_id == patients[i].id) {
    //                 uniqueDoctors.push(patients[i])
    //             }
    //         }
    //     }
    //     let output = [...new Map(uniqueDoctors.map(item => [item.id, item])).values()];
    //     return output;
    // }
    const getUniquePatients = () => {
        for (var i = 0; i < patients.length; i++) {
            for (var j = 0; j < consultations.length; j++) {
                if (consultations[j].patient_id == patients[i].id) {
                    uniquePatients.push(patients[i])
                }
            }
        }
        let output = [...new Map(uniquePatients.map(item => [item.id, item])).values()];
        return output;
    }

    const getUniqueConsultations = () => {
        for (var i = 0; i < consultations.length; i++) {
            for (var j = 0; j < getUniquePatients().length; j++) {
                if (consultations[i].patient_id == getUniquePatients()[j].id) {
                    uniqueConsultations.push(consultations[i])
                }
            }
        }
        let output = [...new Map(uniqueConsultations.filter(item => item.doctor_id == state.loggedInUser.id).map(item => [item.patient_id, item])).values()];
        return output;
    }

    const closePopup = () => {
        setVisibility(false);
    };
    const closePatientPopUp = () => {
        setPatientVisibility(false);
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
    const showPatient = (patient) => {
        setPatientVisibility(true)
        setSelectedPatient(patient)
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
                    {getUniqueConsultations().length > 0 ?
                        <div className="progress-table">
                            <div className="table-head">
                                <div className="serial">#</div>
                                <div className="country">Patient Name</div>
                                <div className="showIcon"></div>
                                <div className="visit">Date</div>
                            </div>
                            <>
                                {getUniqueConsultations()?.filter(consultation => consultation.doctor_id == state.loggedInUser.id)
                                    .map((filteredConsultation, index) => (
                                        <div key={filteredConsultation.id}>
                                            {
                                                <>
                                                    <div className="table-row">
                                                        <div className="serial">
                                                            <span style={{ color: "#953E92" }}>{index + 1}</span>
                                                        </div>

                                                        {getUniquePatients()?.filter(patient => filteredConsultation.patient_id == patient.id)
                                                            .map((filteredPatient) => (
                                                                <div className="country" key={filteredPatient.id} onClick={() => showPatient(filteredPatient)}>
                                                                    <span style={{ color: "#26a994", marginTop: "5px" }}>
                                                                        {filteredPatient.full_name}
                                                                        <br />
                                                                        <span style={{ color: '#993f95', fontSize: "11px", position: 'relative', top: '-8px' }}>View Full Profile</span>
                                                                    </span>
                                                                </div>
                                                            ))}

                                                        <div className='country showIcon' onClick={() => showConsultation(filteredConsultation)}>
                                                            <img src='img/icons/eye.png' alt='show' />
                                                            <span>View</span>
                                                            <br />
                                                            <span style={{ position: 'relative', top: '-20px', left: "-15px" }}>Consultation</span>
                                                        </div>
                                                        <div className="visit">
                                                            <span>{formatDate(filteredConsultation.created_at)}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                            {visible && <ShowSelectedConsultation consultation={selectedConsultation} handleClose={closePopup} />}
                                            {visiblePatient && <ShowSelectedPatient patient={selectedPatient} handleClosePatientPopUp={closePatientPopUp} />}
                                        </div>

                                    )
                                    )}
                            </>
                        </div>
                        :
                        <h5 className='ml-4'>No consultations yet!</h5>
                    }

                </div>
            </div>
        </>
    )
}

const ShowSelectedConsultation = ({ consultation, handleClose }) => {
    // console.log(consultation)
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
                                            <button onClick={showUpdateConsultation} className="boxed-btn">Modify Consultation</button>
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

const ShowSelectedPatient = ({ patient, handleClosePatientPopUp }) => {
    const modalRef = useRef(null);
    const [selectedPatient, setSelectedPatient] = useState("");
    const [visibleSelectedConsultations, setVisibleSelectedConsultations] = useState(false);

    const closeWithAnimation = () => {
        console.log(modalRef)
        if (modalRef.current) {
            modalRef.current.classList.add("closing");
            modalRef.current.classList.remove("closing");
            handleClosePatientPopUp();
        }
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

    const showAllConsultations = (patient) => {
        setSelectedPatient(patient)
        setVisibleSelectedConsultations(true)
    }
    const hideAllConsultations = () => {
        setVisibleSelectedConsultations(false);
    }

    return (
        <div className="depertment_area" ref={modalRef}>
            <div className='graphpop pops' style={{ overflowY: 'scroll' }}>
                <div className="container content">
                    <div className="cancel-btn">
                        <img src="img/icons/cancel.png" id="cancel-here" onClick={closeWithAnimation} />
                    </div>
                    <div className="dept_main_info">
                        <div className="tab-content" id="myTabContent">
                            <div className="row align-items-center">
                                <div className='card mb-5'>
                                    <div className="col-lg-7">
                                        <div className="dept_info">
                                            <h3>Viewing the profile of Patient: <br />
                                                <span style={{ color: '#953E92', fontSize: '16px', position: 'relative', top: '5px' }}>
                                                    {patient.full_name}
                                                </span>
                                            </h3>
                                            <div className='mt-4'>
                                                <h5>Age:</h5>
                                                <span style={{ position: 'relative', top: '5px', color: '#26a994' }}>{getAge(patient.date_of_birth)}</span>
                                            </div>
                                            <div className='mt-4'>
                                                <h5>ID/Iqama number:</h5>
                                                <span style={{ position: 'relative', top: '5px', color: '#26a994' }}>{patient.iqama_number}</span>
                                            </div>
                                            <div className='mt-4'>
                                                <h5>Mobile number:</h5>
                                                <span style={{ position: 'relative', top: '5px', color: '#26a994' }}>{patient.mobile_number}</span>
                                            </div>
                                            <div className='mt-4'>
                                                <h5>Email address:</h5>
                                                <span style={{ position: 'relative', top: '5px', color: '#26a994' }}>{patient.email}</span>
                                            </div>
                                            <div className='mt-4'>
                                                <h5>Nationality:</h5>
                                                <span style={{ position: 'relative', top: '5px', color: '#26a994' }}>{patient.nationality}</span>
                                            </div>
                                            <button onClick={showAllConsultations} className="mt-5 boxed-btn" style={{ fontSize: '13px' }}>View All Consultations</button>
                                        </div>
                                    </div>
                                    {visibleSelectedConsultations && <ShowAllConsultations patientId={patient.id} hideConsultation={hideAllConsultations} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ShowAllConsultations = ({ patientId, hideConsultation }) => {
    const modalRef = useRef(null);
    console.log(hideConsultation)
    const [doctors, setDoctors] = useState([]);
    const [consultations, setConsultations] = useState([]);
    const [selectedConsultation, setSelectedConsultation] = useState("");
    const [visible, setVisibility] = useState(false);
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';

    const fetchConsultations = async () => {
        await axios.get(`${BASE_URL}/consultations/`)
            .then((response) => {
                setConsultations(response.data);
            })
    }
    const closeWithAnimation = () => {
        console.log(modalRef)
        if (modalRef.current) {
            modalRef.current.classList.add("closing");
            modalRef.current.classList.remove("closing");
            hideConsultation();
        }
    }
    const fetchDoctors = async () => {
        await axios.get(`${BASE_URL}/users/`).then((response) => {
            setDoctors(response.data);
        })
    }

    const showConsultation = (consultaion) => {
        setVisibility(true)
        setSelectedConsultation(consultaion)
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
    useEffect(() => {
        fetchConsultations();
        fetchDoctors();
    }, []);

    return (
        <>
            <div className="section-top-border" ref={modalRef}>
                <div className='graphpop pops' style={{ overflowY: 'scroll' }}>
                    <div className="container content">
                        <div className="cancel-btn">
                            <img src="img/icons/cancel.png" id="cancel-here" onClick={closeWithAnimation} />
                        </div>
                        {/* <h2 className="mb-30">Table</h2> */}
                        <div className="progress-table-wrap">
                            <div className="progress-table">
                                <div className="table-head">
                                    <div className="serial">#</div>
                                    <div className="country">Doctor Name</div>
                                    <div className="visit">Date</div>
                                </div>
                                {consultations && consultations?.filter(consultation => consultation.patient_id == patientId).map((filteredConsultation, index) => (
                                    <div key={filteredConsultation.id}>
                                        {
                                            <>
                                                <div className="table-row" onClick={() => showConsultation(filteredConsultation)}>
                                                    <div className="serial">
                                                        <span style={{ color: "#953E92" }}>{index + 1}</span>
                                                    </div>
                                                    {doctors?.filter(doctor => filteredConsultation.doctor_id == doctor.id).map((filteredDoctor) => (
                                                        <div className="country" key={filteredDoctor.id}>
                                                            <span style={{ color: "#26a994", marginTop: "15px", fontSize: '14px' }}>
                                                                {filteredDoctor.full_name}
                                                                <br />
                                                                <span style={{ color: '#993f95', fontSize: "11px", position: 'relative', top: '-3px' }}>
                                                                    {filteredConsultation.chief_complaint}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    ))}
                                                    <div className="visit">
                                                        <span>{formatDate(filteredConsultation.created_at)}</span>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        {visible && <ShowSelectedConsultation consultation={selectedConsultation} handleClose={closePopup} />}
                                    </div>

                                )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}