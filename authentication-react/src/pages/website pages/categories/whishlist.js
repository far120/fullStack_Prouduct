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
        return <h1 style={{ textAlign: "center" }}>No products.....</h1>;
    }

    const mainCategoryList = maincategories.map(maincategory => (
        
            <div key={maincategory._id} style={{ margin: "30px 0" }}>
                <div className="card" style={{ width: "300px", minHeight: "300px", backgroundColor: "#ccc" }}>
                {maincategory.image == null ?
                (
                    <img src={`${BackEnd_url}/images/products/image-1728556100619-300378618.webp`} className="card-img-top imges" style={{  height:"200px" ,  width:"74%" , objectFit:"fill", alignSelf:"center"}} alt={maincategory.name}/> 
                ):
                (

                    <img src={`${BackEnd_url}/images/products/${maincategory.image}`} className="card-img-top imges" style={{  height:"200px" ,  width:"74%" , objectFit:"fill", alignSelf:"center"}} alt={maincategory.name}/>
                )}
                    <div className="bodycard">
                        <p className="cardtitle">
                            {maincategory.title.length > 50 
                                ? `${maincategory.title.substring(0, 20)}...` 
                                : maincategory.title}
                        </p>
                        <p className="cardtitle">{maincategory.category}</p>
                        <p className="cardtitle">{maincategory.subcategory}</p>
                        <div className="aside_part3">
  {Array.from({ length: 5 }, (_, index) => (
    <span key={index} style={{ color: '#f39c12', cursor: 'default' }}>
      {maincategory.totalrating > index ? (
        <i className="fa-solid fa-star"></i> 
      ) : (
        <i className="fa-regular fa-star"></i> // Empty star
      )}
    </span>
  ))}
</div>
                        {maincategory.discount === 0 ? (
                            <p className="cardprice">Rs {maincategory.price}</p>
                        ) : (
                            <div className="price">
                                <p className="cardprice">
                                    <del>Rs {maincategory.price}</del>      
                                    <span>Rs {(maincategory.price - (maincategory.price * maincategory.discount / 100)).toFixed(0)}</span>
                                </p>
                            </div>
                        )}
                        <div className="abtn">
                            <p className="discount">{maincategory.discount}%</p>
                            <Link to={`/product/${maincategory._id}`}>
                                <button className="btn btns"><i className="fa-solid fa-eye"></i></button>
                            </Link>
                        </div>
                        <div className="abtn">
                            <button className="btn" onClick={() => { remove(maincategory._id, userid) }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
       
    ));

    return (
        <div className="maincategories">
            <div className="maincategories-part2">
                <h1 style={{ textAlign: "center" }}>App Product</h1>
                <div className="mycard">
                    {mainCategoryList}
                </div>
            </div>
        </div>
    );
}
  