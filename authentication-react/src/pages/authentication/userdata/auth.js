import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Mycontext } from "../regester & login/context";
import "./auth.css"
import ConfirmDeleteModal from "./confirm";


export default function Auth() {
    const { value, setValue } = useContext(Mycontext);
    const [user, setUser] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:2004/api/authentication",{
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
        axios.delete(`http://localhost:2004/api/authentication/${id}`,{
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
        <div className="auth-container">
            <h1 className="top">Auth Page</h1>
            {user ? (
                user.map(u => (
                    <div className="user-card" key={u._id}>
                        <hr className="divider" />
                        <h2 className="user-id">{u._id}</h2>
                        <img className="user-image" src={`http://localhost:2004/images/uploads/${u.avatar}`}  alt="User Avatar" style={{ width: "200px", height: "250px", objectFit: "cover" }} />
                        <p className="user-name">{u.name}</p>
                        <p className="user-email">{u.email}</p>
                        <div className="button-group">
                            <button className="btn"><Link to={`/auth/${u._id}`}>Show</Link></button>
                            <button className="btn"><Link to={`/updates/${u._id}`}>Update Auth</Link></button>
                            {/* <button className="btn delete-btn" onClick={() => remove(u._id)}>Delete</button> */}
                            <button className="btn delete-btn" onClick={() => setUserToDelete({id: u._id ,myname: u.name})}>Delete</button>
                            
                        
                        </div>
                    </div>
                ))
            ) : (
                <p>No users found</p>
            )}

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
