import { useContext, useEffect, useRef, useState } from 'react'; // Add useState
import { Link, useNavigate } from 'react-router-dom';
import { Mycontext } from '../regester & login/context';
import './nav.css';
import useTokenDecoder from '../jwt/useTokenDecoder';
import images from "./img/gradient-instagram-shop-logo-template_23-2149704603.avif";
import {BackEnd_url}  from '../../../constance';
import Navlinks from './navlinks';
import axios from 'axios';



const NavBar = () => {
  const last =useRef()
  const { value, setValue } = useContext(Mycontext);
  const [wishlist , setwishlist] = useState(0);
  const [cart , setcart] = useState(0)
  const navigate = useNavigate();


// token image and role
  const userData = useTokenDecoder();
  const role = userData?.role;
  const avatar = userData?.avatar;
  const userid = userData?._id;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setValue("default value");
    navigate('/login');
  };

  if (!localStorage.getItem('token') && value !== "default value") {
    localStorage.setItem('token', value);
  }

  if (localStorage.getItem('token') && value === "default value") {
    setValue(localStorage.getItem("token"));
  }


//////////////////scroll ///////////////
const [num , setnum] = useState(0);
window.addEventListener('scroll', function handleScroll(){
    setnum(window.scrollY);
}); 
console.log(num)
useEffect(()=>{
    if(num>200)
    {
        last.current.style.display="block";
    }
    else{
        last.current.style.display="none";
    }
},[num])

function Top() {
    if(num >= 200){
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
}
}

/// cart length
useEffect(() => {
  if (userid) {
      axios.get(`${BackEnd_url}/api/cart/${userid}`, {
          headers: {
              'Authorization': `${localStorage.getItem("token")}`
          }
      })
      .then(response => {
        setcart(response.data.items);
      })
      .catch(error => {
          console.log(error);
          alert(error.response.data || "Failed to fetch products data.");
      });
  }
}, [userid]);





return (
<>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
  <div class="container">
  <div className="">
        <Link to="/">
          <img src={images} alt="Logo" style={{width:"200px" , height:"60px"}} />
        </Link>
      </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
      <form class="container-fluid">
    <div class="input-group" >
      <input type="text" class="form-control" placeholder="Search...." aria-label="Username" aria-describedby="basic-addon1"/>
      <span class="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
    </div>
  </form>

  

        <ul className="navbar-nav d-flex align-items-center col-4" >
          <li className="nav-item me-3 ">
            <Link to="/wishlist" className="nav-link text-dark ">
            <button type="button" class="btn btn-primary position-relative">
            <i className="fas fa-heart"></i> Wishlist</button>
            </Link>
          </li>
          <li className="nav-item me-3 ">
            <Link to="/cart" className="nav-link text-dark ">
            <button type="button" class="btn btn-primary position-relative">
            <i className="fas fa-cart-shopping"></i>Cart <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">{cart.length} <span class="visually-hidden">unread messages</span></span>
</button>
            </Link>
          </li>

          {!localStorage.getItem("token") ? (
            <>
              <li className="nav-item me-3">
                <Link
                  className="nav-link btn btn-primary text-light"
                  aria-current="page"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link
                  className="nav-link btn btn-primary text-light"
                  aria-current="page"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item dropdown">
              <img
                src={`${BackEnd_url}/images/uploads/${avatar}`}
                className="img-fluid dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                alt="..."
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                <Link to="/profile" className="dropdown-item">My Profile</Link>
                </li>
                { window.localStorage.getItem('token') && role === 'adminserver' ?
                <>
            <li>
            <Link to="/auth" className="dropdown-item">Auth</Link>
            </li>
            <li>
            <Link to="/allproducts" className="dropdown-item">AllProducts</Link>
            </li>
            </>
            :(
              null)}
        { window.localStorage.getItem('token') &&( role === 'adminserver' || role === 'admin') ?
            <>
            <li>
            <Link to={`/addproduct/${userid}`} className="dropdown-item">Addproducts</Link>
            </li><li>
            <Link to={`/myproducts`} className="dropdown-item">Myproducts</Link>
            </li>
            </>
            :(
              null)}
                <li>
                <Link to={`/dashboard/${userid}`} className="dropdown-item">Dashboard</Link>
                </li>
                <li>
                <Link to="/notifications" className="dropdown-item">Notifications</Link>
                </li>
                <li>
                <Link to="/help" className="dropdown-item">Help</Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                <button onClick={handleLogout} className="dropdown-item logout-btn">Logout</button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
    <button onClick={Top} ref={last} className="topbtn">
      <i className="fas fa-arrow-up"></i>
    </button>
  </nav>
  <Navlinks />
  </>
);
}

export default NavBar;
