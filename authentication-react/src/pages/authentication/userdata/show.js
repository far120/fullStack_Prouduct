import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Mycontext } from "../regester & login/context";
import "./auth.css"
import {BackEnd_url}  from '../../../constance';

export default function Auth() {
    const { value, setValue } = useContext(Mycontext);
    const [user, setUser] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get(`${BackEnd_url}/api/authentication/${id}`,{
            headers: {
                'Authorization': ` ${value}`
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.log(error);
        });
        
    }, [value ,id]);
    console.log(user)

    const remove = (id) => {
        axios.delete(`${BackEnd_url}/api/authentication/${id}`,{
            headers: {
                'Authorization': ` ${value}`
            }
        })
        .then(response => {
            setUser(user.filter(u => u._id!== id));
        })
        .catch(error => {
            console.log(error);
        });
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-2">
            <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8 tracking-tight drop-shadow-lg">User Details</h1>
            {user ? (
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                    <img className="w-40 h-52 object-cover rounded-lg border-4 border-blue-200 mb-4" src={`${BackEnd_url}/images/uploads/${user.avatar}`} alt="User Avatar" />
                    <h2 className="text-lg font-bold text-blue-900 mb-2">{user.name}</h2>
                    <p className="text-gray-600 mb-2">{user.email}</p>
                    <p className="text-xs text-gray-400 mb-2">ID: {user._id}</p>
                    <div className="flex flex-col gap-2 w-full mt-4">
                        <Link to={`/auth/${user._id}`} className="w-full"><button className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">Show</button></Link>
                        <Link to={`/updates/${user._id}`} className="w-full"><button className="w-full py-2 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-500 transition">Update Auth</button></Link>
                        <button className="w-full py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition" onClick={() => remove(user._id)}>Delete</button>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-400">No user found</p>
            )}
        </div>
    );
}
