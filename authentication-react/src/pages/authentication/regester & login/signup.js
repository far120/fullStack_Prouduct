import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './login.css';

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
        
     
         axios.post("http://localhost:2004/api/authentication", {
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
        <div className="back-image">
            <div className="cards">
                <form className="forms" onSubmit={handleSubmit}>
                    <h2 className='top'>SignUp</h2>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        id="name"
                        onChange={handleNameChange}
                        placeholder='Enter your username'
                         />
                    <br />
                    {accept && name === "" && <p className="error">Name is required</p>}

                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder='Enter your email'
                    />
                    <br />
                    {accept && email === "" && <p className="error">Email is required</p>}

                    <label>Password:</label>
                    <input
                        type="password"
                        value={password} 
                        onChange={handlePasswordChange}
                        placeholder='Enter your password'
                    />
                    <br />
                    {accept && password.length < 8 && (
                        <p className="error">Password must be at least 8 characters</p>
                    )}

                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={cpassword} // Bound the value
                        id="confirmPass"
                        onChange={handleCpasswordChange}
                        placeholder='Confirm your password'
                    />
                    <br />
                    {accept && cpassword !== password && (
                        <p className="error">Passwords do not match</p>
                    )}
                   <label>Profile Picture:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                    />


                    <div className='btnl'>
                    <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    );
}
