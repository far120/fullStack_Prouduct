import { useEffect, useState } from "react";
import useTokenDecoder from "../../authentication/jwt/useTokenDecoder";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Dashboard() {
   const { id } = useParams();
   const [name , setname] = useState();
    const [dashboard, setDashboard] = useState({}); // Keep this as an object to hold more data if needed
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:2004/api/authentication/${id}`, {
                headers: {
                    'Authorization': `${window.localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                setname(response.data.name);  
                setDashboard(response.data.products.reverse()); // Set the entire response data
            })
            .catch((error) => {
                console.log(error);
                setError("Failed to fetch user data."); 
            });
        }
    }, [id]);



    return (
        <div className="container mt-4">
            <h1>Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            
            {dashboard && dashboard.length > 0 && (
                <div className="mt-4">
                    <h2>Your Products:</h2>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>ID</th>
                                <th>Product_ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboard.map(item => (
                                <tr key={item._id}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{item._id}</td>
                                    <td>{item.product}</td>
                                    <td>{item.actions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
