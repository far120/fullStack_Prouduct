import {  useEffect, useState , useContext } from 'react';
import { Mycontext } from './context';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import {BackEnd_url}  from '../../../constance';
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
       await axios.post(`${BackEnd_url}/api/authentication/login`,
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
    <div className="back-image d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: '400px' }}>
        <form className="forms" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Login</h2>
          
          {/* Email Input */}
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {/* Password Input */}
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="pass"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          {/* Error Message */}
          {password.length < 8 && accept && (
            <p className="text-danger">Password must be greater than 8 characters</p>
          )}
  
          {/* Submit Button */}
          <div className="text-center">
            <input type="submit" value="Submit" className="btn btn-primary w-100" />
          </div>
        </form>
      </div>
    </div>
  );
  
}
