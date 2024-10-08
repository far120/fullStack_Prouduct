import { useEffect, useState } from "react";
import Aside from "../aside/aside";
import "./maincategories.css";
import { Link } from "react-router-dom";
import useTokenDecoder from "../../authentication/jwt/useTokenDecoder";
import axios from "axios";


export default function AllProducts() {
    const [maincategories, setmaincategories] = useState([]);
    const tokendata = useTokenDecoder();
    const userid = tokendata?._id;
  const role = tokendata?.role;


  console.log(role);


    useEffect(() => {
        fetch('http://localhost:2004/api/products')
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
        axios.delete(`http://localhost:2004/api/products/${id}/${userid}`,{
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
        axios.post(`http://localhost:2004/api/wishlist/${userid}/products/${productid}`,{
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
        axios.post(`http://localhost:2004/api/cart/${userid}/products/${productid}`)
       .then(response => {
            alert('Product added to cart successfully');
        })
       .catch(error => {
            console.log(error);
            alert(error.response.data)
        });
    }



    if (maincategories.length === 0) return <h1 style={{textAlign:"center"}}>No products.....</h1>; // Check if maincategories is empty

    const mainCategoryList = maincategories.map(maincategory => (
        <div  key={maincategory._id} style={{margin:"30px 0"}} >
            <div className="card" style={{width: "300px" , minHeight:"300px" ,backgroundColor:"#ccc"}}>
  <img src={`http://localhost:2004/images/products/${maincategory.image}`} className="card-img-top imges" style={{  height:"200px" ,  width:"74%" , objectFit:"fill", alignSelf:"center"}} alt={maincategory.name}/>
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

  
    { maincategory.discount == 0 ?(
    <p className="cardprice">Rs {maincategory.price}</p>
    ) : (
<div className="price">
        <p className="cardprice"><del>Rs {maincategory.price}</del>      <span>Rs {maincategory.price - (maincategory.price * maincategory.discount / 100).toFixed(0)}</span></p>
</div>
    )}
    <div className="abtn">
        <p className="discount" >{maincategory.discount}%</p>
    <button className="btn btnh " onClick={()=>{addToWishlist(maincategory._id)}}><i class="fa-regular fa-heart"></i></button>
    <button className="btn btnc " onClick={()=>{addToCart(maincategory._id)}}><i class="fa-solid fa-cart-shopping"></i></button>
    <Link to={`/product/${maincategory._id}`}><button className="btn btns" ><i class="fa-solid fa-eye"></i></button></Link>
</div>
{  role == "adminserver" ? (

<div className="abtn">
  <button className="btn" onClick={()=>{remove(maincategory._id , userid)}} >Delete</button>
  <Link to={`/product/${maincategory._id}/${userid}`}><button className="btn">Edit</button></Link>
  </div>
)
: null}
  </div>
</div>
        
        </div>
    ));


    return (
        <div className="maincategories">
            <div className="maincategories-part1">
                <Aside/>
            </div>
            <div className="maincategories-part2">
             <h1 style={{textAlign:"center"}}>App product</h1>
                <div className="mycard">
                {mainCategoryList}
                </div>
            </div>
        </div>
    );
}
