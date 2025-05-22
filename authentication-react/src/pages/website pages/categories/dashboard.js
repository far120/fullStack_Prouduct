import { useEffect, useState } from "react";
import useTokenDecoder from "../../authentication/jwt/useTokenDecoder";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {BackEnd_url}  from '../../../constance';

export default function Dashboard() {
   const { id } = useParams();
   const [name , setname] = useState();
    const [dashboard, setDashboard] = useState({}); // Keep this as an object to hold more data if needed
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (id) {
            axios.get(`${BackEnd_url}/api/authentication/${id}`, {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-300 p-4">
        <div className="max-w-6xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 border border-blue-200 backdrop-blur-md">
          <h1 className="text-4xl font-extrabold text-blue-900 text-center mb-8 tracking-tight drop-shadow-lg">Dashboard</h1>
          {error && <p className="text-center text-red-600 font-semibold mb-4">{error}</p>}
          {dashboard && dashboard.length > 0 ? (
            <div className="overflow-x-auto">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Your Products</h2>
              <table className="min-w-full bg-white rounded-xl shadow-lg">
                <thead>
                  <tr className="bg-blue-100 text-blue-900">
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3 px-4">User Name</th>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Product ID</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.map(item => (
                    <tr key={item._id} className="border-b hover:bg-blue-50">
                      <td className="py-2 px-4">{new Date(item.createdAt).toLocaleString()}</td>
                      <td className="py-2 px-4">{id}</td>
                      <td className="py-2 px-4">{name}</td>
                      <td className="py-2 px-4">{item._id}</td>
                      <td className="py-2 px-4">
                        <Link to={`/product/${item.product}`} className="text-blue-700 hover:underline">{item.product}</Link>
                      </td>
                      <td className="py-2 px-4">{item.actions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          {(!dashboard || dashboard.length === 0) && (
            <h2 className="text-center text-xl text-gray-500 font-semibold py-16">No products found.</h2>
          )}
        </div>
      </div>
    );
}
