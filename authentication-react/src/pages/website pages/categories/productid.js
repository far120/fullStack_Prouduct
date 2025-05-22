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
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-300 p-4">
    <div className="max-w-5xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-10 border border-blue-200 backdrop-blur-md">
      {/* Product Image and Details */}
      <div className="flex-1 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2">
          <img
            src={product.image == null
              ? `${BackEnd_url}/images/products/image-1728556100619-300378618.webp`
              : `${BackEnd_url}/images/products/${product.image}`}
            alt={product.title}
            className="w-full w-400 h-96 object-contain rounded-2xl border-2 border-blue-200 shadow-md mb-4 bg-white"
            style={{ background: '#fff', objectFit: 'contain' }}
          />
          <div className="flex gap-2 mt-2">
            {/* Thumbnails (if you have more images, map here) */}
            <img
              src={product.image == null
                ? `${BackEnd_url}/images/products/image-1728556100619-300378618.webp`
                : `${BackEnd_url}/images/products/${product.image}`}
              alt={product.title}
              className="w-20 h-20 object-contain rounded-lg border border-blue-200 bg-white"
              style={{ background: '#fff', objectFit: 'contain' }}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <h1 className="text-3xl font-extrabold text-blue-900 mb-2">{product.title}</h1>
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
          <p className="text-xs text-gray-400 mb-2">{product.subcategory}</p>
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} className="text-yellow-400">
                {product.totalrating > index ? (
                  <i className="fa-solid fa-star"></i>
                ) : (
                  <i className="fa-regular fa-star"></i>
                )}
              </span>
            ))}
            <span className="ml-2 text-sm text-blue-700">({product.rating || 0}/5)</span>
          </div>
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Description</h3>
          <p className="text-gray-700 mb-4">{product.description && (product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description)}</p>
          {product.discount > 0 ? (
            <div className="flex items-center gap-3 mb-2">
              <span className="text-gray-400 line-through text-lg">Rs {product.price}</span>
              <span className="text-2xl font-bold text-green-700">Rs {(product.price - (product.price * product.discount / 100)).toFixed(0)}</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow font-bold animate-pulse">{product.discount}% OFF</span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-green-700 mb-2">Rs {product.price}</span>
          )}
          <div className="flex gap-4 mt-4">
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded-xl shadow transition" onClick={addToCart}>Add To Cart</button>
            <button className="bg-pink-600 hover:bg-pink-800 text-white font-bold py-2 px-6 rounded-xl shadow transition" onClick={addToWishlist}>Add to Wishlist</button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-xl shadow transition">🔄 Compare</button>
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <div className="w-full mt-10">
        <h3 className="text-2xl font-bold text-blue-900 mb-4">Reviews ({reviews.length})</h3>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-blue-50 rounded-xl p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-blue-800">🙍 {review.username}</p>
                <p className="text-gray-700">Comment: {review.comment}</p>
                <p className="text-yellow-600">Rating: {review.rating} / 5.0</p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                {(review.user_id === userid || role === 'adminserver') && (
                  <button className="bg-red-600 hover:bg-red-800 text-white px-4 py-1 rounded shadow text-xs font-semibold" onClick={removeReview}>Delete</button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-900 hover:to-purple-900 text-white font-bold py-2 px-6 rounded-xl shadow-lg transition text-lg tracking-wide" onClick={toggleReviewForm}>
          {isReviewFormVisible ? "Cancel Review" : "Write a Review"}
        </button>
        {isReviewFormVisible && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-bold text-blue-900 mb-2">Write a Review</h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="rating" className="font-semibold text-blue-900">Rating:</label>
              <select id="rating" value={rating} onChange={handleRating} className="rounded border border-blue-300 px-3 py-2">
                {[1,2,3,4,5].map(val => <option key={val} value={val}>{val}</option>)}
              </select>
              <label htmlFor="comment" className="font-semibold text-blue-900">Comment:</label>
              <textarea id="comment" rows="4" value={comment} onChange={handelcomment} className="rounded border border-blue-300 px-3 py-2" />
              <button type="submit" className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded-xl shadow transition">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
    {/* Related Products */}
    <div className="max-w-7xl mx-auto mt-16">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Related Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {related && related.map(maincategory => (
          <div key={maincategory._id} className="bg-white/90 rounded-2xl shadow-xl p-5 flex flex-col items-center border border-blue-100">
            <img
              src={`${BackEnd_url}/images/products/${maincategory.image}`}
              alt={maincategory.title}
              className="h-56 w-56 object-contain rounded-xl mb-4 border-2 border-blue-200 bg-white"
              style={{ background: '#fff', objectFit: 'contain', maxWidth: '100%' }}
            />
            <Link to={`/product/${maincategory._id}`} className="w-full">
              <div className="w-full flex flex-col items-center">
                <p className="text-lg font-bold text-blue-900 truncate mb-1">{maincategory.title.length > 50 ? `${maincategory.title.substring(0, 20)}...` : maincategory.title}</p>
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
                <div className="flex items-center space-x-2">
                  {maincategory.discount === 0 ? (
                    <span className="text-xl font-bold text-green-700">Rs {maincategory.price}</span>
                  ) : (
                    <>
                      <span className="text-gray-400 line-through">Rs {maincategory.price}</span>
                      <span className="text-xl font-bold text-green-700">Rs {(maincategory.price - (maincategory.price * maincategory.discount / 100)).toFixed(0)}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}