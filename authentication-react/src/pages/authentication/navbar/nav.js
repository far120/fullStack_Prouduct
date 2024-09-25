import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mycontext, MyContext } from '../regester & login/context';
import './nav.css';
import images from '../regester & login/images/pngtree-a-conceptual-illustration-of-web-design-development-and-seo-optimization-in-image_13584944.png';
import  useTokenDecoder  from '../jwt/useTokenDecoder';
const NavBar = () => {
  const { value, setValue } = useContext(Mycontext);
  const navigate = useNavigate();

  const userData = useTokenDecoder();
  const role =  userData?.role ;


  const handleLogout = () => {
    localStorage.removeItem('token');
    setValue("default value");
    navigate('/login');
   
  };
  if(!localStorage.getItem('token') && value !== "default value") {
      localStorage.setItem('token', value);
  }

  if(localStorage.getItem('token') && value == "default value"){
    setValue(localStorage.getItem("token"))
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="#" className="nav-link">
          <i className="fa-regular fa-heart"></i> Wishlist
        </Link>
        <Link to="#" className="nav-link">
          <i className="fa-solid fa-cart-shopping"></i> Cart
        </Link>
        <Link to="#" className="nav-link">Categories</Link>
        { value !== "default value" && role == "adminserver" ? (
         <Link to="/auth" className="nav-link">Auth</Link>
        ):
        (<span></span>)}      
        <div className="nav-dropdown">
          <button className="dropdown-btn">More</button>
          <div className="dropdown-content">
            <Link to="/culture" className="dropdown-item">Culture</Link>
            <Link to="/sport" className="dropdown-item">Sport</Link>
            <Link to="/weather" className="dropdown-item">Weather</Link>
          </div>
        </div>
        <div className="nav-dropdown">
          <button className="dropdown-btn">Language</button>
          <div className="dropdown-content">
            <Link to="/en" className="dropdown-item">English</Link>
            <Link to="/es" className="dropdown-item">Spanish</Link>
          </div>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
          <button className="search-btn">Search</button>
        </div>
        <div className="authv-container">
          {!localStorage.getItem("token") ? (
            <>
              <Link to="/signup" className="authv-btn">Signup</Link>
              <Link to="/login" className="authv-btn">Login</Link>
            </>
          ) : (
            <div className="profile-dropdown">
              <button className="profile-btn">
                <img src={images} alt="Profile" className="profile-img" />
              </button>
              <div className="profile-dropdown-content">
                <Link to="/profile" className="dropdown-item">My Profile</Link>
                <button onClick={handleLogout} className="dropdown-item logout-btn">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
