import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './productid.css';
import axios from "axios";
import useTokenDecoder from "../../authentication/jwt/useTokenDecoder";
import {BackEnd_url}  from '../../../constance';

export default function Productid(){
    const tokendata = useTokenDecoder();
    const userid = tokendata?._id;
    const role = tokendata?.role;
    const{id} = useParams();
    console.log(id)
    const [comment , setcomment] = useState();
    const [rating , setrating] = useState(1);
    const [product , setproduct] = useState(null)
    const [reviews, setreviews] = useState([])
    const [rend, setrend] = useState(5);
    const [related, setrelated] = useState()
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

    
    const toggleReviewForm = () => {
        setIsReviewFormVisible(!isReviewFormVisible);
    };

    const handelcomment = (e) => {
        setcomment(e.target.value);
    }
    const handleRating = (e) => {
        setrating(e.target.value);
    }



    
useEffect(() => {
    
     fetch(`${BackEnd_url}/api/products/${id}`)
       .then(res => res.json())
       .then(data => setproduct(data))
       .catch(err => console.log(err))


       fetch(`${BackEnd_url}/api/products`)
    .then(res => res.json())
    .then(data =>{
        const relatedProducts = data.filter(product => product._id!== id && product.category === product.category).slice(0, 3);
        setrelated(relatedProducts);
    })
    .catch(err => console.log(err))
    

        fetch(`${BackEnd_url}/api/review/${id}`)
       .then(res => res.json())
       .then(data =>{
        const review = data.map(review=>(
            setreviews(review.Reviews)
        )
        )
        }) 
       .catch(err => console.log(err))    
},[rend , id]);


const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BackEnd_url}/api/review/${userid}/${id}`, {
        comment,
        rating
    })
    .then(response => {
        alert('Review added successfully');
        setcomment('');
        setrating(1);
        setrend(0)
    })
    .catch(error => {
        console.log(error);
        alert(error.response.data.message);
    });

    // axios.put(`${BackEnd_url}/api/review/${userid}/${id}`, {
    //     comment,
    //     rating
    // })
    // .then(response => {
    //     alert('Review added successfully');
    //     setcomment('');
    //     setrating(1);
    //     setrend(0)
    // })
    // .catch(error => {
    //     console.log(error);
    //     alert(error.response.data.message);
    // });
    

    toggleReviewForm();


};

const removeReview = () => {
    axios.delete(`${BackEnd_url}/api/review/${userid}/${id}`)
   .then(response => {
    setreviews(reviews.filter(review => review._id!== response.data._id));
    setrend(1);
    setrating(1);
    setcomment('');
    alert('Review deleted successfully');
})
   .catch(error => {
        console.log(error);
        alert(error.response.data.message);
    });
}



const addToWishlist = () => {
    axios.post(`${BackEnd_url}/api/wishlist/${userid}/products/${id}`,{
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
const addToCart = () => {
    axios.post(`${BackEnd_url}/api/cart/${userid}/products/${id}`)
   .then(response => {
        alert('Product added to cart successfully');
    })
   .catch(error => {
        console.log(error);
        alert(error.response.data)
    });
}



    if (!related ||  related.length === 0) {
        return <h1 style={{ textAlign: "center" }}>No related products found...</h1>;
    }


if(!product || product.length === 0)
 {
    return <div>Product Not Found</div>;
}

return (
    <div className="product-page">
        <div className="showpart1">
            <div className="product-image">
                
            {product.image == null ?
                (
                    <img src={`${BackEnd_url}/images/products/image-1728556100619-300378618.webp`} alt={product.title} />
                ):
                (

                    <img src={`${BackEnd_url}/images/products/${product.image}`} alt={product.title} />
                )}
                {/* Thumbnail images for selection */}
                <div className="thumbnail-images">
                {product.image == null ?
                (
                    <img src={`${BackEnd_url}/images/products/image-1728556100619-300378618.webp`} alt={product.title} />
                ):
                (

                    <img src={`${BackEnd_url}/images/products/${product.image}`} alt={product.title} />
                )}
                    {/* Add more thumbnail images if needed */}
                </div>
            </div>
            <div className="product-details">
                <h1>{product.title}</h1>
                <p >{product.category}</p>
                <p>{product.subcategory}</p>
                <p>Rating: {product.rating}<div className="aside_part3">
  {Array.from({ length: 5 }, (_, index) => (
    <span key={index} style={{ color: '#f39c12', cursor: 'default' }}>
      {product.totalrating > index ? (
        <i className="fa-solid fa-star"></i> 
      ) : (
        <i className="fa-regular fa-star"></i> // Empty star
      )}
    </span>
  ))}
</div></p>
<h3>Description:  {product.description.length > 50 
        ? `${product.description.substring(0, 50)}...` 
        : product.description} </h3>

        
               
                {product.discount > 0 ? (
                    <p className="price">
                        <span className="original-price">Rs {product.price}</span>
                        <span className="discounted-price">Rs {(product.price - (product.price * product.discount / 100)).toFixed(0)}</span>
                        <span className="discount-percentage">{product.discount}%</span>
                    </p>
                ) : (
                    <p className="price">Rs {product.price}</p>
                )}
                <div className="quantity-control">
                    <button className="add-to-cart" onClick={()=>addToCart()}>Add To Cart</button>
                </div>
                <div className="product-actions">
                    <button className="compare-button btn">🔄</button>
                    <button className="wishlist-button btn" onClick={()=>addToWishlist()} >❤️</button>
                </div>
            </div>
        </div>
        <div className="description-section">
            <h3>Reviews ({reviews.length})</h3>
            {reviews.map((review, index) => (
                <div key={index} className="review">
                    <p>🙍{review.username}</p>
                    <p>Comment: {review.comment}</p>
                    <p>Rating: {review.rating} / 5.0</p>
                    {review.user_id === userid || role == 'adminserver' ? (
                        <button className="btn" onClick={() => removeReview()}>Delete</button>        
                    ):
                    (
                        null
                    )}
                     {review.user_id === userid  ? (
                        <button className="btn">Edit</button>       
                    ):
                    (
                        null
                    )}
                    <hr />
                </div>
                
            ))}
            <button className="write-review" onClick={toggleReviewForm}>
                {isReviewFormVisible ? "Cancel Review" : "Write a Review"}
            </button>

            {/* Review form visibility is controlled by the state */}
            {isReviewFormVisible && (
                <div className="write-review">
                    <h4>Write a Review</h4>
                    <form>
                        <label htmlFor="rating">Rating:</label>
                        <select id="rating" onChange={handleRating} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <label htmlFor="comment" >Comment:</label>
                        <textarea id="comment" rows="4" cols="50" onChange={handelcomment}></textarea>
                        <button onClick={handleSubmit} type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>



        <h3>Related Products:</h3>
        <div className="related-products">
            {related.map(maincategory => (
                <div key={maincategory._id} style={{ margin: "30px 0" }}>
                    
                    <div className="card" style={{ width: "300px", minHeight: "300px", backgroundColor: "#ccc" }}>
                        <img 
                            src={`${BackEnd_url}/images/products/${maincategory.image}`} 
                            className="card-img-top imges" 
                            style={{ height: "200px", width: "74%", objectFit: "fill", alignSelf: "center" }} 
                            alt={maincategory.title} 
                        />
                        <Link to={`/product/${maincategory._id}`} style={{textDecoration:"none"}}>
                        <div className="bodycard" style={{ padding: "10px" }}>
                            <p className="cardtitle">
                                {maincategory.title.length > 50 
                                    ? `${maincategory.title.substring(0, 20)}...` 
                                    : maincategory.title}
                            </p>
                            <p className="cardtitle">{maincategory.category}</p>
                            <p className="cardtitle">{maincategory.subcategory}</p>

                            {/* Rating stars */}
                            <div className="aside_part3" style={{ marginTop: "10px" }}>
                                {Array.from({ length: 5 }, (_, index) => (
                                    <span key={index} style={{ color: '#f39c12', cursor: 'default' }}>
                                        {maincategory.totalrating > index ? (
                                            <i className="fa-solid fa-star"></i>
                                        ) : (
                                            <i className="fa-regular fa-star"></i>
                                        )}
                                    </span>
                                ))}
                            </div>

                            {/* Price and Discount logic */}
                            <div className="price" style={{ marginTop: "10px" }}>
                                {maincategory.discount === 0 ? (
                                    <p className="cardprice">Rs {maincategory.price}</p>
                                ) : (
                                    <p className="cardprice">
                                        <del>Rs {maincategory.price}</del>
                                        <span style={{ marginLeft: "10px", color: "red" }}>
                                            Rs {maincategory.price - (maincategory.price * maincategory.discount / 100).toFixed(0)}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </Link>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}

{/* <div className="related-products">
{related.map((relatedProduct, index) => (
    <div key={index} className="related-product">
        <img src={`${BackEnd_url}/images/products/${relatedProduct.image}`} alt={relatedProduct.title} />
        <p>{relatedProduct.title}</p>
        <p>Rs {relatedProduct.price}</p>
        <p>In Stock</p>
    </div>
))}
</div> */}