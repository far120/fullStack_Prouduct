import { useEffect, useState } from "react";
import useTokenDecoder from "../../authentication/jwt/useTokenDecoder";
import { Link } from "react-router-dom";
import axios from "axios";
import {BackEnd_url}  from '../../../constance';


export default function Wishlist() {
    const userdata = useTokenDecoder();
    const userid = userdata?._id;
    const [wishlist, setWishlist] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null); // For error handling
    const [productIds, setProductIds] = useState([]); // State to hold product IDs
    const [maincategories, setMainCategories] = useState([]);
    
    useEffect(() => {
        if (userid) {
            fetch(`${BackEnd_url}/api/wishlist/${userid}`)
            .then((response) => response.json())
                .then((data) => {
                    const products = data.products || [];
                    setWishlist(products);
                    setProductIds(products.map(product => product.product_id)); 
                })
                .catch((error) => {
                    console.error(error);
                    setError("Failed to fetch wishlist data.");
                });
        }
    }, [userid]);

    useEffect(() => {
            fetch(`${BackEnd_url}/api/products`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        const filteredProducts = data.filter(product => productIds.includes(product._id));
                        setMainCategories(filteredProducts);
                    } else {
                        console.log("Invalid data received");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setError("Failed to fetch products data.");
                });
    }, [productIds]); 
    console.log(maincategories)

    const remove = (id, userid) => {
        axios.delete(`${BackEnd_url}/api/wishlist/${userid}/products/${id}`, {
            headers: {
                'Authorization': `${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setMainCategories(maincategories.filter(u => u._id !== id));
            alert('Product deleted successfully');
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data);
        });
    }

    
    if (!maincategories || maincategories.length === 0) {
        return <h1 className="text-center text-2xl font-bold text-gray-400 py-16">No products in your wishlist.</h1>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-2">
            <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-10 tracking-tight drop-shadow-lg">My Wishlist</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {maincategories.map(maincategory => (
                    <div key={maincategory._id} className="w-80 min-h-[340px] bg-white rounded-2xl shadow-xl hover:shadow-2xl transition flex flex-col items-center p-5 relative border border-blue-100 group">
                        <img
                            src={maincategory.image == null
                                ? `${BackEnd_url}/images/products/image-1728556100619-300378618.webp`
                                : `${BackEnd_url}/images/products/${maincategory.image}`}
                            alt={maincategory.name}
                            className="h-48 w-11/12 object-cover rounded-xl mb-4 border-2 border-blue-200 group-hover:scale-105 transition-transform duration-300"
                        />
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
                            {maincategory.discount > 0 && (
                                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-lg font-bold animate-pulse">{maincategory.discount}% OFF</div>
                            )}
                            <div className="flex space-x-3 mt-4 justify-center">
                                <Link to={`/product/${maincategory._id}`}><button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 shadow" title="View Details"><i className="fa-solid fa-eye"></i></button></Link>
                                <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 shadow" onClick={() => { remove(maincategory._id, userid) }} title="Remove from Wishlist"><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
