import { useEffect, useState , useContext } from 'react';
import { Mycontext } from './context';
import { useNavigate } from 'react-router-dom';
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
            navigate('/'); 
        })
        .catch((error) => {
            alert(error.response.data)
            console.error('Error:', error);
        });
    }
}
return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password:</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">Login</button>
        </form>
      </div>
    </div>
  );
}
