import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './login.css';
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
    console.log(avatar);
    
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
                alert(error.response.data)
            });
    
    }

    return (
        <div className="back-image d-flex justify-content-center align-items-center vh-100">
          <div className="card shadow-lg p-4" style={{ width: '400px' }}>
            <form className="forms" onSubmit={handleSubmit}>
              <h2 className="text-center mb-4">SignUp</h2>
              
              {/* Name Input */}
              <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  value={name}
                  id="name"
                  className="form-control"
                  onChange={handleNameChange}
                  placeholder="Enter your username"
                />
                {accept && name === "" && <p className="text-danger">Name is required</p>}
              </div>
              
              {/* Email Input */}
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  value={email}
                  className="form-control"
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                />
                {accept && email === "" && <p className="text-danger">Email is required</p>}
              </div>
              
              {/* Password Input */}
              <div className="form-group mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  value={password}
                  className="form-control"
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                />
                {accept && password.length < 8 && (
                  <p className="text-danger">Password must be at least 8 characters</p>
                )}
              </div>
      
              {/* Confirm Password Input */}
              <div className="form-group mb-3">
                <label htmlFor="confirmPass" className="form-label">Confirm Password:</label>
                <input
                  type="password"
                  value={cpassword}
                  id="confirmPass"
                  className="form-control"
                  onChange={handleCpasswordChange}
                  placeholder="Confirm your password"
                />
                {accept && cpassword !== password && (
                  <p className="text-danger">Passwords do not match</p>
                )}
              </div>
      
              {/* Profile Picture Input */}
              <div className="form-group mb-3">
                <label className="form-label">Profile Picture:</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
      
              {/* Submit Button */}
              <div className="text-center">
                <input type="submit" value="Register" className="btn btn-primary w-100" />
              </div>
            </form>
          </div>
        </div>
      );
      
}
