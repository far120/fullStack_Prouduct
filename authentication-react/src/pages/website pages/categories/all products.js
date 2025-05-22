import { useEffect, useState } from "react";
import Aside from "../aside/aside";
import "./maincategories.css";
import { Link } from "react-router-dom";
import useTokenDecoder from "../../authentication/jwt/useTokenDecoder";
import axios from "axios";
import {BackEnd_url}  from '../../../constance';


export default function AllProducts() {
    const [maincategories, setmaincategories] = useState([]);
    const tokendata = useTokenDecoder();
    const userid = tokendata?._id;
  const role = tokendata?.role;


  console.log(role);


    useEffect(() => {
        fetch(`${BackEnd_url}/api/products`)
            .then(response => response.json())
            .then(data => {
                setmaincategories(data)
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert("Failed to fetch products");
            });
    }, []); 

    const remove = (id , userid) => {
        axios.delete(`${BackEnd_url}/api/products/${id}/${userid}`,{
            headers: {
                'Authorization': `${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setmaincategories(maincategories.filter(u => u._id!== id));
            alert('Product deleted successfully');
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data)
        });
    }

    // whish list 
    const addToWishlist = (productid) => {
        axios.post(`${BackEnd_url}/api/wishlist/${userid}/products/${productid}`,{
            headers: {
                'Authorization': `${localStorage.getItem("token")}`
            }
        })
       .then(response => {
            alert('Product added to wishlist successfully');
        })
       .catch(error => {
            console.log(error);
            alert(error.response.data.message)
            
        });
    }
    // cart 
    const addToCart = (productid) => {
        axios.post(`${BackEnd_url}/api/cart/${userid}/products/${productid}`)
       .then(response => {
            alert('Product added to cart successfully');
        })
       .catch(error => {
            console.log(error);
            alert(error.response.data)
        });
    }



    if (maincategories.length === 0) return <h1 className="text-center text-2xl font-bold text-gray-400 py-16">No products found.</h1>; // Check if maincategories is empty

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-2 md:px-8 py-10">
        <main className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12 tracking-tight drop-shadow-lg">All Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {maincategories.map(maincategory => (
              <div key={maincategory._id} className="w-full max-w-xs bg-white/90 rounded-3xl shadow-xl hover:shadow-blue-200 transition flex flex-col items-center p-6 relative border border-blue-100 group mx-auto">
                <div className="relative w-full flex justify-center">
                  <img
                    src={maincategory.image == null
                      ? `${BackEnd_url}/images/products/image-1728556100619-300378618.webp`
                      : `${BackEnd_url}/images/products/${maincategory.image}`}
                    alt={maincategory.name}
                    className="h-48 w-full object-cover rounded-xl mb-4 border-2 border-blue-200 group-hover:scale-105 transition-transform duration-300 shadow-md"
                  />
                  {maincategory.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-lg font-bold animate-pulse">{maincategory.discount}% OFF</span>
                  )}
                </div>
                <div className="w-full flex-1 flex flex-col justify-between">
                  <p className="text-lg font-bold text-blue-900 truncate mb-1 group-hover:text-purple-700 transition">{maincategory.title.length > 50 ? `${maincategory.title.substring(0, 20)}...` : maincategory.title}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{maincategory.category}</p>
                  <p className="text-xs text-gray-400 mb-2">{maincategory.subcategory}</p>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }, (_, index) => (
                      <span key={index} className="text-yellow-400">
                        {maincategory.totalrating > index ? (
                          <i className="fa-solid fa-star"></i>
                        ) : (
                          <i className="fa-regular fa-star"></i>
                        )}
                      </span>
                    ))}
                  </div>
                  {maincategory.discount === 0 ? (
                    <p className="text-xl font-bold text-green-700">Rs {maincategory.price}</p>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-400 line-through">Rs {maincategory.price}</p>
                      <span className="text-xl font-bold text-green-700">Rs {(maincategory.price - (maincategory.price * maincategory.discount / 100)).toFixed(0)}</span>
                    </div>
                  )}
                  <div className="flex space-x-3 mt-4 justify-center">
                    <button className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-600 shadow transition" onClick={() => { addToWishlist(maincategory._id) }} title="Add to Wishlist"><i className="fa-regular fa-heart"></i></button>
                    <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 shadow transition" onClick={() => { addToCart(maincategory._id) }} title="Add to Cart"><i className="fa-solid fa-cart-shopping"></i></button>
                    <Link to={`/product/${maincategory._id}`}><button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 shadow transition" title="View Details"><i className="fa-solid fa-eye"></i></button></Link>
                  </div>
                  {role === "adminserver" && (
                    <div className="flex space-x-2 mt-3 justify-center">
                      <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-semibold transition" onClick={() => { remove(maincategory._id, userid) }}>Delete</button>
                      <Link to={`/product/${maincategory._id}/${userid}`}><button className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 text-xs font-semibold transition">Edit</button></Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
}
