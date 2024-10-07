import { useEffect, useState } from "react";
import useTokenDecoder from "../../authentication/jwt/useTokenDecoder";
import axios from "axios";

export default function Dashboard() {
    const userData = useTokenDecoder();
    const userid = userData?._id;  
    const [dashboard, setDashboard] = useState({}); // Keep this as an object to hold more data if needed
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (userid) {
            axios.get(`http://localhost:2004/api/authentication/${userid}`, {
                headers: {
                    'Authorization': `${window.localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                setDashboard(response.data); // Set the entire response data
            })
            .catch((error) => {
                console.log(error);
                setError("Failed to fetch user data."); 
            });
        }
    }, [userid]);

    console.log(dashboard); // Log the entire dashboard object to debug

    return (
        <div className="container mt-4">
            <h1>Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            
            {dashboard.products && dashboard.products.length > 0 && (
                <div className="mt-4">
                    <h2>Your Products:</h2>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboard.products.map(item => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.product}</td>
                                    <td>{item.actions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {(!dashboard.products || dashboard.products.length === 0) && <p>No products found.</p>} {/* Fallback message */}
        </div>
    );
}
