import React from 'react';
import image1 from './fotter/icons8-paypal-logo-94.png';
import visaImage from './fotter/visa-logo-png-2024.png';
import mastercardImage from './fotter/mastercard-26132.png';
import americanExpressImage from './fotter/id_AI72f5e_1725822771396.png';
import discoverImage from './fotter/idCbZQ9q4z_logos.png';
import dinersClubImage1 from './fotter/idDLREVHuv_1725822549633.png';
import dinersClubImage2 from './fotter/idMrTgFKyZ_1725822438103.jpeg';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-8 mt-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Select */}
                <div>
                    <h5 className="font-bold mb-4 text-yellow-400">Select</h5>
                    <select className="w-full mb-2 rounded p-2 text-black">
                        <option>Country</option>
                        <option>Egypt</option>
                        <option>USA</option>
                        <option>France</option>
                    </select>
                    <select className="w-full rounded p-2 text-black">
                        <option>Currency</option>
                        <option>EGP</option>
                        <option>USD</option>
                        <option>EUR</option>
                    </select>
                </div>
                {/* App Download */}
                <div>
                    <h5 className="font-bold mb-4 text-yellow-400">Get Our App</h5>
                    <img src={image1} alt="App Store" className="w-20 h-20 object-contain mb-2" />
                </div>
                {/* Support */}
                <div>
                    <h5 className="font-bold mb-4 text-yellow-400">Support</h5>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-yellow-300">Contact</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Legal Notice</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Cookies & Marketing Preferences</a></li>
                        <li><a href="#" className="hover:text-yellow-300">General Terms</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Digital Services Act</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Sitemap</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Do not Sell/Share Info</a></li>
                    </ul>
                </div>
                {/* Company */}
                <div>
                    <h5 className="font-bold mb-4 text-yellow-400">Company</h5>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-yellow-300">About Us</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Careers</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Press</a></li>
                        <li><a href="#" className="hover:text-yellow-300">Blog</a></li>
                    </ul>
                </div>
                {/* Payment Methods */}
                <div>
                    <h5 className="font-bold mb-4 text-yellow-400">Payment Methods</h5>
                    <div className="flex flex-wrap gap-2 items-center">
                        <img src={visaImage} alt="Visa" className="w-10 h-8 object-contain" />
                        <img src={mastercardImage} alt="Mastercard" className="w-10 h-8 object-contain" />
                        <img src={americanExpressImage} alt="American Express" className="w-10 h-8 object-contain" />
                        <img src={discoverImage} alt="Discover" className="w-10 h-8 object-contain" />
                        <img src={dinersClubImage1} alt="Diners Club" className="w-10 h-8 object-contain" />
                        <img src={dinersClubImage2} alt="Diners Club" className="w-10 h-8 object-contain" />
                    </div>
                </div>
            </div>
            <div className="text-center text-gray-300 mt-8 text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</div>
        </footer>
    );
}
