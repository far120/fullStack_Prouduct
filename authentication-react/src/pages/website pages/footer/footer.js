import React from 'react';
import './footer.css'
import image1 from './fotter/icons8-paypal-logo-94.png'; // Ensure this path is correct
import visaImage from './fotter/visa-logo-png-2024.png'; // Ensure this path is correct
import mastercardImage from './fotter/mastercard-26132.png'; // Ensure this path is correct
import americanExpressImage from './fotter/id_AI72f5e_1725822771396.png'; // Ensure this path is correct
import discoverImage from './fotter/idCbZQ9q4z_logos.png'; // Ensure this path is correct
import dinersClubImage1 from './fotter/idDLREVHuv_1725822549633.png'; // Ensure this path is correct
import dinersClubImage2 from './fotter/idMrTgFKyZ_1725822438103.jpeg'; // Ensure this path is correct

export default function Footer() {
    return (
        <section className="footer bg-dark text-light py-4">
            <div className="container">
                <div className="row">
                    {/* First Column: Select */}
                    <div className="col-lg-2 col-md-4 mb-4">
                        <h5 className="text-gold">Select</h5>
                        <div className="form-group mb-2">
                            <select className="form-select">
                                <option selected>Country</option>
                                <option value="1">Egypt</option>
                                <option value="2">USA</option>
                                <option value="3">France</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <select className="form-select">
                                <option selected>Currency</option>
                                <option value="1">EGP</option>
                                <option value="2">USD</option>
                                <option value="3">EUR</option>
                            </select>
                        </div>
                    </div>

                    {/* Second Column: App Download */}
                    <div className="col-lg-2 col-md-4 mb-4">
                        <h5 className="text-gold">Get Our App</h5>
                        <a href="#">
                            <img src={image1} alt="App Store" className="img-fluid mb-2" />
                        </a>
                    </div>

                    {/* Third Column: Support */}
                    <div className="col-lg-2 col-md-4 mb-4">
                        <h5 className="text-gold">Support</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-gold">Contact</a></li>
                            <li><a href="#" className="text-gold">Legal Notice</a></li>
                            <li><a href="#" className="text-gold">Privacy Policy</a></li>
                            <li><a href="#" className="text-gold">Cookies and Marketing Preferences</a></li>
                            <li><a href="#" className="text-gold">General Terms and Conditions</a></li>
                            <li><a href="#" className="text-gold">Information according to the Digital Services Act</a></li>
                            <li><a href="#" className="text-gold">Sitemap</a></li>
                            <li><a href="#" className="text-gold">Do not Sell or Share my Personal Information</a></li>
                        </ul>
                    </div>

                    {/* Fourth Column: Company */}
                    <div className="col-lg-2 col-md-4 mb-4">
                        <h5 className="text-gold">Company</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-gold">About Us</a></li>
                            <li><a href="#" className="text-gold">Careers</a></li>
                            <li><a href="#" className="text-gold">Blog</a></li>
                            <li><a href="#" className="text-gold">Press</a></li>
                            <li><a href="#" className="text-gold">Gift Cards</a></li>
                            <li><a href="#" className="text-gold">Explorer</a></li>
                        </ul>
                    </div>

                    {/* Fifth Column: Work With Us */}
                    <div className="col-lg-2 col-md-4 mb-4">
                        <h5 className="text-gold">Work With Us</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-gold">As a Supply Partner</a></li>
                            <li><a href="#" className="text-gold">As a Content Creator</a></li>
                            <li><a href="#" className="text-gold">As an Affiliate Partner</a></li>
                        </ul>
                    </div>

                    {/* Payment Methods */}
                    <div className="col-lg-2 col-md-4 mb-4">
                        <h5 className="text-gold">Payment Methods</h5>
                        <div className="payment-icons">
                            <img src={visaImage} alt="Visa" className="payment-icon" />
                            <img src={mastercardImage} alt="Mastercard" className="payment-icon" />
                            <img src={image1} alt="PayPal" className="payment-icon" />
                            <img src={americanExpressImage} alt="American Express" className="payment-icon" />
                            <img src={discoverImage} alt="Discover" className="payment-icon" />
                            <img src={dinersClubImage1} alt="Diners Club" className="payment-icon" />
                            <img src={dinersClubImage2} alt="Diners Club" className="payment-icon" />
                        </div>
                    </div>
                </div>

                {/* Social Media Section and Copyright */}
                <div className="row text-center mt-4">
                    <div className="col">
                        <h5 className="text-gold">Follow Us</h5>
                        <a href="#" className="me-2">
                            <i className="fab fa-facebook text-gold fa-2x"></i>
                        </a>
                        <a href="#" className="me-2">
                            <i className="fab fa-twitter text-gold fa-2x"></i>
                        </a>
                        <a href="#" className="me-2">
                            <i className="fab fa-instagram text-gold fa-2x"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-linkedin text-gold fa-2x"></i>
                        </a>
                    </div>
                </div>

                <div className="text-center pt-3">
                    <p className="text-gold">&copy;MOSTAFA ELFAR 2024. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
}
