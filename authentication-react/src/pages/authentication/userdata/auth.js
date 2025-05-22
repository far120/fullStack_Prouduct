import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Mycontext } from "../regester & login/context";
import "./auth.css"
import ConfirmDeleteModal from "./confirm";
import {BackEnd_url}  from '../../../constance';


export default function Auth() {
    const { value, setValue } = useContext(Mycontext);
    const [user, setUser] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);
    useEffect(() => {
        axios.get(`${BackEnd_url}/api/authentication`,{
            headers: {
                'Authorization': ` ${value}`
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data)
        });
        
    }, [value]);

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
            alert(error.response.data)
        });
    }
   


    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-2">
            <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8 tracking-tight drop-shadow-lg">User Management</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto w-full">
                {user && user.length > 0 ? (
                    user.map(u => (
                        <div className="w-full max-w-xs bg-white rounded-xl shadow-lg p-6 flex flex-col items-center relative" key={u._id}>
                            <img className="w-32 h-40 object-cover rounded-lg border-4 border-blue-200 mb-4" src={`${BackEnd_url}/images/uploads/${u.avatar}`} alt="User Avatar" />
                            <h2 className="text-lg font-bold text-blue-900 mb-1">{u.name}</h2>
                            <p className="text-gray-600 mb-1">{u.email}</p>
                            <p className="text-xs text-gray-400 mb-2">ID: {u._id}</p>
                            <p className="text-xs text-purple-700 mb-4">Role: {u.role}</p>
                            <div className="flex flex-col gap-2 w-full">
                                <Link to={`/auth/${u._id}`} className="w-full"><button className="w-full py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition">Show</button></Link>
                                <Link to={`/updates/${u._id}`} className="w-full"><button className="w-full py-2 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-500 transition">Update Auth</button></Link>
                                <Link to={`/dashboard/${u._id}`} className="w-full"><button className="w-full py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition">Show Dashboard</button></Link>
                                <button className="w-full py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition" onClick={() => setUserToDelete({id: u._id ,myname: u.name})}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 col-span-full">No users found</p>
                )}
            </div>
            {userToDelete && (
                <ConfirmDeleteModal 
                    id={userToDelete.id} 
                    name={userToDelete.myname}
                    onConfirm={(id) => {
                        remove(id);
                        setUserToDelete(null);
                    }} 
                    onCancel={() => setUserToDelete(null)} 
                />
            )}
        </div>
    );
 
  
}
