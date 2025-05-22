import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; 
import '../regester & login/login.css';
import { Mycontext } from '../regester & login/context';
import useTokenDecoder from '../jwt/useTokenDecoder';
import {BackEnd_url}  from '../../../constance';

export default function Update() {
    const userdata = useTokenDecoder();
    const role = userdata?.role;
    const { value } = useContext(Mycontext);
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [show, setShow] = useState("");
    const [Role, setRole] = useState();
    const [accept, setAccept] = useState(false);

    useEffect(() => {
        axios.get(`${BackEnd_url}/api/authentication/${id}`, {
            headers: {
                'Authorization': ` ${value}`
            }
        })
        .then(response => {
            if (response.data) { // Check if response.data is defined
                const userData = response.data;
                setName(userData.name);
                setEmail(userData.email);
                setShow(userData.avatar);
                setRole(userData.role);
            } else {
                console.error('No data found in response');
                alert('No user data found');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            const errorMessage = error.response?.data || 'An error occurred while fetching data';
            alert(errorMessage); 
        });
    }, [id, value]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handleRoleChange(e) {
        setRole(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setAccept(true);

        if (name === "" || email === "") {
            alert("Name and Email are required fields.");
            return; 
        }

        axios.put(`${BackEnd_url}/api/authentication/${id}`, {
            name,
            email,
            role: Role
        }, {
            headers: {
                'Authorization': ` ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            alert('User updated successfully');
            navigate('/auth');
        })
        .catch(error => {
            console.error('Error updating user:', error);
            const errorMessage = error.response?.data || 'An error occurred while updating user';
            alert(errorMessage);
        });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-2">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                <img 
                    className="w-40 h-52 object-cover rounded-lg border-4 border-blue-200 mb-4" 
                    src={`${BackEnd_url}/images/uploads/${show}`} 
                    alt="User Avatar" 
                />
                <form className="space-y-6 w-full" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Update User</h2>
                    {/* Role selection for adminserver */}
                    {role === "adminserver" && (
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Role:</label>
                            <select onChange={handleRoleChange} value={Role} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                                <option value={Role}>{Role}</option>
                                {Role === "adminserver" ? null : Role === "admin" ? (
                                    <option value="user">User</option>
                                ) : (
                                    <option value="admin">Admin</option>
                                )}
                            </select>
                        </div>
                    )}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Name:</label>
                        <input
                            type="text"
                            value={name}
                            id="name"
                            onChange={handleNameChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {accept && name === "" && <p className="text-red-500 text-xs mt-1">Name is required</p>}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            value={email}
                            id="email"
                            onChange={handleEmailChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {accept && email === "" && <p className="text-red-500 text-xs mt-1">Email is required</p>}
                    </div>
                    <input type="submit" value="Update" className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition cursor-pointer" />
                </form>
            </div>
        </div>
    );
}
