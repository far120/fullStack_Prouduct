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



   
    if ( !mycart || mycart.length === 0) { 
        return (
            <div style={{textAlign:"center"}}>No products in your cart....</div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center">Cart Products</h1>
            <h3 className="text-center">Total Price: Rs {totalPrice}</h3>
            <div className="table-responsive">
        <table className="table table-bordered table-hover mt-4">
          <thead className="thead-light">
                    <tr>
                        <th scope="col">Product Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mycart.map(product => (
                        <tr key={product._id}>
                            <td>
                            {product.imageUrl == null ?
                (
                    <img 
                    src={`${BackEnd_url}/images/products/image-1728556100619-300378618.webp`}
                    alt={product.title} 
                    className="img-fluid" 
                    style={{ maxWidth: "100px", maxHeight: "100px" }} 
                />
                ):
                (

                    <img 
                    src={`${BackEnd_url}/images/products/${product.imageUrl}`} 
                    alt={product.title} 
                    className="img-fluid" 
                    style={{ maxWidth: "100px", maxHeight: "100px" }} 
                />
                )}
                        
                            </td>
                            <td>{product.title}</td>
                            <td>{product.quantity}
                                <button className="btn btn-primary" onClick={() => updateQuantity(product.productId, product.quantity + 1)}>+</button>
                                <button className="btn btn-primary" onClick={() => updateQuantity(product.productId, product.quantity - 1)}>-</button>
                            </td>
                            <td>
                                { product.discount > 0 ?(
                                <>
                              <del>  Rs {product.price}</del>
                              <span> Rs {(product.price - (product.price * product.discount / 100)).toFixed(0)}</span>
                              </>
                                ):
                                <span>Rs {product.price}</span>
                            } 
                                </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => remove(product.productId)}>Remove</button>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}
