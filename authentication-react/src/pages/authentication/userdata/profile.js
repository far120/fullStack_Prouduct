import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Mycontext } from "../regester & login/context";
import "./auth.css";
import  useTokenDecoder  from '../jwt/useTokenDecoder';

export default function Profile() {
    const { value, setValue } = useContext(Mycontext);
    const [user, setUser] = useState([]);
    const userData = useTokenDecoder();
    const id = userData?._id;  

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:2024/api/authentication/${id}`, {
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
        }
    }, [id, value]);  
    return (
        <div className="auth-container">
            <h1 className="top">profile</h1>
            {user ? (
                <div className="user-card" key={user._id}>
                    <hr className="divider" />
                    <h2 className="user-id">{user._id}</h2>
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                    <div className="button-group">
                        <button className="btn"><Link to={`/updates/${user._id}`}>Update Auth</Link></button>
                    </div>
                </div>
            ) : (
                <p>No users found</p>
            )}
        </div>
    );
}
