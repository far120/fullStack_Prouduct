import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import {BackEnd_url}  from '../../../constance';

export default function SignUp() {
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const [avatar , setavatar] = useState("");    
    const [accept, setaccept] = useState(false);
    function handleNameChange(e) {
        setname(e.target.value);
    }
    function handleEmailChange(e) {
        setemail(e.target.value);
    }
    function handlePasswordChange(e) {
        setpassword(e.target.value);
    }
    function handleCpasswordChange(e) {
        setcpassword(e.target.value);
    }
    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file)
            setavatar(file); 
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setaccept(true);
        if (name === "" || password.length < 8 || password !== cpassword || email === "") {
            return false;
        }
         axios.post(`${BackEnd_url}/api/authentication`, {
                name,  
                email,
                password,
                avatar
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                if (response.status==200 || response.status==201){
                    alert('User Registration successful! Please login.')
                    navigate("/login");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Registration failed!');
            });
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Sign Up</h2>
                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name:</label>
                        <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={name} onChange={handleNameChange} placeholder="Enter your name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email:</label>
                        <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={email} onChange={handleEmailChange} placeholder="Enter your email" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password:</label>
                        <input type="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={password} onChange={handlePasswordChange} placeholder="Enter your password" />
                    </div>
                    <div>
                        <label htmlFor="cpassword" className="block text-gray-700 font-semibold mb-2">Confirm Password:</label>
                        <input type="password" id="cpassword" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" value={cpassword} onChange={handleCpasswordChange} placeholder="Confirm your password" />
                    </div>
                    <div>
                        <label htmlFor="avatar" className="block text-gray-700 font-semibold mb-2">Avatar:</label>
                        <input type="file" id="avatar" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={handleImageChange} />
                    </div>
                    <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">Sign Up</button>
                </form>
            </div>
        </div>
    );
}
