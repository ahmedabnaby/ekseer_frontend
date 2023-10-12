

import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer_top">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-4 col-md-6 col-lg-4 ">
                <div className="footer_widget">
                  <div className="footer_logo">
                    <a href="#">
                      <img src="img/logo.png" alt="" />
                    </a>
                  </div>
                  <p className="address_text">Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit, sed do <br /> eiusmod tempor incididunt ut labore.
                  </p>
                  <div className="socail_links">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="ti-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="ti-twitter-alt" />
                        </a>
                      </li>
                      {/* <li>
                        <a href="#">
                          <i className="fa fa-dribbble" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa fa-instagram" />
                        </a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
              {/* <div className="col-xl-8 col-md-6 col-lg-4 popup_box" id='footer_contact_form'>
                <h3 style={{color:'#24ab94'}}>
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
              </div> */}
            </div>
            <div className="row justify-content-center">
              <a href="/contact-us" className="boxed-btn contact-us-btn">Contact us</a>
            </div>
          </div>
        </div>
        <div className="copy-right_text">
          <div className="container">
            <div className="row">
              <div className="bordered_1px " />
              <div className="col-xl-12">
                <p className="copy_right text-center">
                  Copyright © All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;