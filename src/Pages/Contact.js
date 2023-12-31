import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "../Includes/Footer"

const Contact = () => {
    const { state } = useLocation();
    const nav = useNavigate();

    console.log(state)
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-md-6 col-lg-4 popup_box" id='footer_contact_form'>
                        <h3 style={{ color: '#24ab94' }}>
                            Reach out to us
                            <span>Here!</span>
                        </h3>
                        <form action="#">
                            <div className="row">
                                <div className="col-xl-12">
                                    <input type="text" placeholder="Full Name" required />
                                </div>
                                <div className="col-xl-6">
                                    <input type="number" placeholder="Mobile Number" required />
                                </div>
                                <div className="col-xl-6">
                                    <input type="email" placeholder="Email Address" required />
                                </div>
                                <div className="col-xl-12">
                                    <textarea placeholder="Your message ..." required></textarea>
                                </div>
                                <div className="col-xl-12">
                                    <button type="submit" className="boxed-btn mt-4" style={{ width: "100%" }}>Send Message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default Contact;