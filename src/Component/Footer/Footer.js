import React from "react";
import "./Footer.css";
class Footer extends React.Component {
  render() {
    return (
      <>
        <footer>
          <div className="container-footer">
            <div className="content-footer">
              <div className="company-name">
                <h4>About</h4>
                <h5>Contact Us</h5>
                <h5>Privacy Policy</h5>
                <h5>Terms and Condition</h5>
              </div>
              <div className="quick-link">
                <h4>SUPPORT</h4>
                <h5>Shipping Info</h5>
                <h5>Track Order</h5>
                <h5>Help/FAQ</h5>
              </div>
              <div className="contact-us">
                <h4>Contact Us</h4>
                <h5>Call Us: +123 456 789 00</h5>
                <h5>Email Us: ghorerbazarbd.com@gmail.com</h5>
                <div className="Icon">
                  <i className="fa-brands fa-square-facebook"></i>
                  <i className="fa-brands fa-linkedin"></i>
                  <i className="fa-brands fa-square-google-plus"></i>
                </div>
              </div>
            </div>
          </div>
          <h4 className="copyright">
            Copyright shiny clean © 2023. All rights reserved.
          </h4>
        </footer>
      </>
    );
  }
}

export default Footer;
