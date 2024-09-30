import {  useEffect, useState , useContext } from 'react';
import { Mycontext } from './context';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import Cookies from 'js-cookie';
export default function Login() {
    const { value, setValue } = useContext(Mycontext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [accept, setAccept] = useState(false);


   async function handleSubmit(e) {
        e.preventDefault();
        setAccept(true);
        if (password.length>7 )
            setShow(false);

        if(setShow){
       await axios.post("http://localhost:2004/api/authentication/login",
            {
                email,
                password
            }
        )
        .then((response) => {
          setValue(response.data.token);
            // Cookies.set('token', response.data.token, { expires: 7 });
            // localStorage.setItem('token', response.data.token);
            navigate('/'); 
        })
        .catch((error) => {
            alert(error.response.data)
            console.error('Error:', error);
        });
    }
}
    return (
        
        <div className="back-image">
            <div className="cards">
                <form className="forms" onSubmit={handleSubmit}>
                    <h2 className='top'>Login</h2>
                    <label>Email:</label>
                    <input 
                        type="email" 
                         placeholder='Enter email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    /><br />
                    <label >Password:</label>
                    <input 
                        type="password" 
                         placeholder='Enter your password'
                        id="pass" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    /><br />
                    {password.length < 8 && accept && (
                        <p>Password must be greater than 8 characters</p>
                    )}
                    <div className="btns">
                    <input type="submit" value="Submit" />
                   
                    </div>
                </form>
            </div>


        </div>
    );
}
