import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-4">
      <div className="container">
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-4">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          {/* Column 2 */}
          <div className="col-md-4">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Teams and Conditions</a></li>
            </ul>
          </div>
          {/* Column 3 */}
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>

        </div>
        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} SEO Helper Tools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
