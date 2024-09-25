import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Mycontext } from "../regester & login/context";
import "./auth.css"

export default function Auth() {
    const { value, setValue } = useContext(Mycontext);
    const [user, setUser] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:2024/api/authentication/${id}`,{
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
        axios.delete(`http://localhost:2024/api/authentication/${id}`,{
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
        <div className="auth-container">
            <h1 className="top">Auth Page</h1>
            {user ? (
                    <div className="user-card" key={user._id}>
                        <hr className="divider" />
                        <h2 className="user-id">{user._id}</h2>
                        <p className="user-name">{user.name}</p>
                        <p className="user-email">{user.email}</p>
                        <div className="button-group">
                            <button className="btn"><Link to={`/auth/${user._id}`}>Show</Link></button>
                            <button className="btn"><Link to={`/updates/${user._id}`}>Update Auth</Link></button>
                            <button className="btn delete-btn" onClick={() => remove(user._id)}>Delete</button>
                        </div>
                    </div>
                )
             : (
                <p>No users found</p>
            )}
        </div>
    );
}
