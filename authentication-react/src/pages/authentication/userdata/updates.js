import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; 
import '../regester & login/login.css';
import { Mycontext } from '../regester & login/context';



export default function Update() {
    const { value, setValue } = useContext(Mycontext);
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [show, setShow] = useState("");
    const [accept, setAccept] = useState(false);

    useEffect(() => {
        // Fetch user data on component mount and populate form fields
        axios.get(`http://localhost:2004/api/authentication/${id}`,
            {
                headers: {
                    'Authorization': ` ${value}`
                }
            }
        )
            .then(response => {
                console.log(response.data);
                const userData = response.data;
                setName(userData.name);
                setEmail(userData.email);
                setShow(userData.avatar);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                alert(error.response.data)
            });
    }, [id]);


    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
   

    

    async function handleSubmit(e) {
        e.preventDefault();
        setAccept(true);
        if (name === "" || email === "") {
           return false;
        }

        // Send PUT request to update user details

        axios.put(`http://localhost:2004/api/authentication/${id}`, {
            name: name,
            email: email,
           
          
        }, {
            headers: {
                'Authorization': ` ${localStorage.getItem('token')}`  
            }
        })
        .then(response => {
            
            alert('User updated successfully');
            navigate('/');
        
        })
        .catch(error => {
            console.error('Error updating user:', error);
            alert(error.response.data);
        });

}

    return (
        <div className="back-image">
            <img className="user-image" src={`http://localhost:2004/uploads/${show}`} style={{ width: "200px", height: "250px", objectFit: "cover" }} alt="User Avatar" />
            <div className="pa">
                <form className="forms" onSubmit={handleSubmit}>
                    <h2>Update User</h2>

                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        id="name"
                        onChange={handleNameChange}
                    />
                    <br />
                    {accept && name === "" && <p className="error">Name is required</p>}

                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        id="email"
                        onChange={handleEmailChange}
                    />
                    <br />
                    {accept && email === "" && <p className="error">Email is required</p>}
                  
                
                    <input type="submit" value="Update" />
                </form>
            </div>
        </div>
    );
}
