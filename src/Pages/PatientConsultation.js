import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

export const PatientConsultation = () => {
    const { state } = useLocation();
    const [consultations, setConsultations] = useState([]);
    const [selectedConsultation, setSelectedConsultation] = useState("");
    const [newConsultations, setNewConsultations] = useState(false);
    const [visible, setVisibility] = useState(false);
    const [doctors, setDoctors] = useState([]);
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
            <div className="bradcam_area breadcam_bg_1">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bradcam_text">
                                <h3>My Consultations</h3>
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
                                <div className="country">Doctor Name</div>
                                <div className="visit">Date</div>
                            </div>
                            {consultations && consultations?.filter(consultation => consultation.patient_id == state.loggedInUser.id).map((filteredConsultation, index) => (
                                <div key={filteredConsultation.id}>
                                    {
                                        <>
                                            <div className="table-row" onClick={() => showConsultation(filteredConsultation)}>
                                                <div className="serial">
                                                    <span style={{ color: "#953E92" }}>{index + 1}</span>
                                                </div>
                                                {doctors?.filter(doctor => filteredConsultation.doctor_id == doctor.id).map((filteredDoctor) => (
                                                    <div className="country" key={filteredDoctor.id}>
                                                        <span style={{ color: "#26a994", marginTop: "5px" }}>
                                                            {filteredDoctor.full_name}
                                                            <br />
                                                            <span style={{ color: '#993f95', fontSize: "11px", position: 'relative', top: '-8px' }}>
                                                                {filteredConsultation.chief_complaint}
                                                            </span>
                                                        </span>
                                                    </div>
                                                ))}
                                                <div className="visit">
                                                    <span>{formatDate(filteredConsultation.created_at)}</span>
                                                </div>
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
        </>
    )
}

const ShowSelectedConsultation = ({ consultation, handleClose }) => {
    console.log(consultation)
    const BASE_URL = 'http://127.0.0.1:8000/authentication-api';
    const [doctors, setDoctors] = useState([]);
    const fetchDoctors = async () => {
        await axios.get(`${BASE_URL}/users/`).then((response) => {
            setDoctors(response.data);
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
    useEffect(() => {
        fetchDoctors();
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
                                            <h3>Viewing of consultaion of Doctor: &nbsp;
                                                <span style={{ color: '#953E92' }}>
                                                    {doctors.map((doctor) => (
                                                        consultation.doctor_id == doctor.id ?
                                                            doctor.full_name
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}