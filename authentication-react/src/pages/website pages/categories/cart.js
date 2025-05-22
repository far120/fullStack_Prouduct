import { useContext, useEffect, useState } from "react";
import useTokenDecoder from "../../authentication/jwt/useTokenDecoder";
import { Link } from "react-router-dom";
import axios from "axios";
import { Mycontext } from "../../authentication/regester & login/context";
import {BackEnd_url}  from '../../../constance';

export default function Cart() {
    const userdata = useTokenDecoder();
    const userid = userdata?._id;
    const [totalPrice, settotalPrice] = useState();
    const [mycart, setmycart] = useState([]); // Change this line to initialize with an empty array
    const [quantity, setquantity] = useState();

    const { lengthcart, setlengthcart} = useContext(Mycontext)
   
    useEffect(() => {
        if (userid) {
            axios.get(`${BackEnd_url}/api/cart/${userid}`, {
                headers: {
                    'Authorization': `${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                setmycart(response.data.items);
                settotalPrice(response.data.totalPrice);
            })
            .catch(error => {
                console.log(error);
                alert(error.response.data || "Failed to fetch products data.");
            });
        }
    }, [userid , totalPrice]);

    console.log(mycart);
    console.log(totalPrice);
  
    const remove = (id) => {
        axios.delete(`${BackEnd_url}/api/cart/${userid}/products/${id}`, {
            headers: {
                'Authorization': `${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setmycart(mycart.filter(item => item._id!== id));
            settotalPrice(response.data.totalPrice);
            alert('Product deleted successfully');
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data || "Failed to remove the product.");
        });
    }
    
    const updateQuantity = (id, newQuantity) => {
        axios.put(`${BackEnd_url}/api/cart/${userid}/products/${id}`, 
            {quantity: newQuantity},
            {
            headers: {
                'Authorization': `${localStorage.getItem("token")}`
            }
        })
       .then(response => {
        setquantity(newQuantity);
        settotalPrice(response.data.totalPrice);
    })
    .catch(error => {
        console.log(error);
        alert(error.response.data || "Failed to update the quantity.");
    });
}



   
    if (!mycart || mycart.length === 0) { 
        return (
            <div className="text-center text-2xl font-bold text-gray-400 py-16">No products in your cart.</div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-2">
            <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-6 tracking-tight drop-shadow-lg">Cart Products</h1>
            <h3 className="text-xl text-center text-green-700 mb-8">Total Price: Rs {totalPrice}</h3>
            <div className="overflow-x-auto max-w-5xl mx-auto">
                <table className="min-w-full bg-white rounded-xl shadow-lg">
                    <thead>
                        <tr className="bg-blue-100 text-blue-900">
                            <th className="py-3 px-4">Product Image</th>
                            <th className="py-3 px-4">Title</th>
                            <th className="py-3 px-4">Quantity</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mycart.map(product => (
                            <tr key={product._id} className="border-b hover:bg-blue-50">
                                <td className="py-2 px-4">
                                    <img 
                                        src={product.imageUrl == null
                                            ? `${BackEnd_url}/images/products/image-1728556100619-300378618.webp`
                                            : `${BackEnd_url}/images/products/${product.imageUrl}`}
                                        alt={product.title}
                                        className="w-20 h-20 object-cover rounded shadow"
                                    />
                                </td>
                                <td className="py-2 px-4 font-semibold text-blue-800">{product.title}</td>
                                <td className="py-2 px-4">
                                    <div className="flex items-center gap-2 justify-center">
                                        <button className="px-2 py-1 bg-blue-200 text-blue-700 rounded hover:bg-blue-300" onClick={() => updateQuantity(product.productId, product.quantity - 1)}>-</button>
                                        <span className="font-bold text-lg">{product.quantity}</span>
                                        <button className="px-2 py-1 bg-blue-200 text-blue-700 rounded hover:bg-blue-300" onClick={() => updateQuantity(product.productId, product.quantity + 1)}>+</button>
                                    </div>
                                </td>
                                <td className="py-2 px-4">
                                    {product.discount > 0 ? (
                                        <span>
                                            <span className="line-through text-gray-400 mr-2">Rs {product.price}</span>
                                            <span className="text-green-700 font-bold">Rs {(product.price - (product.price * product.discount / 100)).toFixed(0)}</span>
                                        </span>
                                    ) : (
                                        <span className="text-green-700 font-bold">Rs {product.price}</span>
                                    )}
                                </td>
                                <td className="py-2 px-4">
                                    <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => remove(product.productId)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
