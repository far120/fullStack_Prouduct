import { useEffect, useState } from "react";
import Aside from "../aside/aside";
import "./maincategories.css";
import { Link } from "react-router-dom";

export default function Maincategories(props) {
    const [maincategories, setmaincategories] = useState([]);
    const [review , setreview] = useState([]);
    // console.log(props.category)

    useEffect(() => {
        fetch('http://localhost:2004/api/products')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const filteredProducts = data.filter(product => {
                        if (props.subcategory === undefined) {
                            return product.category === props.category; 
                        } else {
                            return  product.subcategory === props.subcategory; 
                        }
                    });
                    if (filteredProducts.length > 0) {
                        setmaincategories(filteredProducts);
                    } else {
                        setmaincategories([]);     
                    }
                } else {
                    setmaincategories([]); 
                   
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert("Failed to fetch products");
            });
    }, [props.category, props.subcategory]); 


    if (maincategories.length === 0) return <h1>Loading...</h1>; // Check if maincategories is empty

    const mainCategoryList = maincategories.map(maincategory => (
        <div  key={maincategory._id} style={{margin:"20px 0"}} >
            <Link to={`/products/${maincategory._id}`} style={{textDecoration:"none" }}>
            <div className="card" style={{width: "300px" , height:"400px"}}>
  <img src={`http://localhost:2004/images/products/${maincategory.image}`} className="card-img-top imges" style={{ height:"70%" , width:"100%" , objectFit:"fill"}} alt={maincategory.name}/>
  <div className="bodycard">
  <p className="cardtitle">
    {maincategory.title.length > 50 
        ? `${maincategory.title.substring(0, 30)}...` 
        : maincategory.title}
</p>
<div className="aside_part3">
  {[1 , 1 ,1 ,1 ,1 ].map((star) => (
    <span
      key={star}
      style={{ color: '#f39c12', cursor: 'default' }} // All stars will be gold and non-clickable
    >
      ★
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
    <button className="btn btnh "><i class="fa-regular fa-heart"></i></button>
    <button className="btn btns" ><i class="fa-solid fa-eye"></i></button>
</div>
  </div>
</div>
        </Link>
        </div>
    ));


    return (
        <div className="maincategories">
            <div className="maincategories-part1">
                <Aside/>
            </div>
            <div className="maincategories-part2">
                <h1>Welcome to My App</h1>
                <div className="mycard">
                {mainCategoryList}
                </div>
            </div>
        </div>
    );
}
