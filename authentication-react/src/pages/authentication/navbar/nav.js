import { useContext, useEffect, useRef, useState } from 'react'; // Add useState
import { Link, useNavigate } from 'react-router-dom';
import { Mycontext } from '../regester & login/context';
import './nav.css';
import useTokenDecoder from '../jwt/useTokenDecoder';
import images from "./img/gradient-instagram-shop-logo-template_23-2149704603.avif";

const NavBar = () => {
  const last =useRef()
  const { value, setValue } = useContext(Mycontext);
  const navigate = useNavigate();

  const userData = useTokenDecoder();
  const role = userData?.role;
  const avatar = userData?.avatar;

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
  
  const [isCollapsed, setIsCollapsed] = useState(true); // Add state for collapse

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed); // Toggle the collapsed state
  };

//////////////////scroll ///////////////
const [num , setnum] = useState(0);
window.addEventListener('scroll', function handleScroll(){
    setnum(window.scrollY);
}); 
// console.log(num)
useEffect(()=>{
    if(num>100)
    {
        last.current.style.display="block";
    }
    else{
        last.current.style.display="none";
    }
},[num])

function Top() {
    if(num >= 100){
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
}
}

  return (
    <div className={`navbar-container  ${isCollapsed? 'collapsed' : ''}`}>
    <nav className='navbar'>
      <div className="logo">
        <Link to="/">
          <img src={images} alt="Logo" />
        </Link>
      </div>
      <div className="search-box">
        <input type="text" placeholder="Search..." />
        <button className="search-icon">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <button className="navbar-toggler" onClick={toggleCollapse}>
        <i className={`fas ${isCollapsed ? 'fa-bars' : 'fa-bars'}`}></i>
      </button>
      <div className={`part3 ${isCollapsed ? 'collapsed' : ''}`}>
        <Link to="/wishlist" className="links">
          <i className="fas fa-heart"></i> Wishlist<span className="count">0</span>
        </Link>

        <Link to="/cart" className="links">
          <i className="fas fa-cart-shopping"></i> Cart<span className="count">0</span>
        </Link>

        {!localStorage.getItem("token") ? (
          <>
            <Link to="/signup" className="btn btn-custom">Sign Up</Link>
            <Link to="/login" className="btn btn-custom">Login</Link>
          </>
        ) : (
          <div className="dropdown">
          <Link
            to="/fashion" 
            className="links dropdown-toggle"
            role="button"
            id="fashionDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={`http://localhost:2004/images/uploads/${avatar}`}
              alt="Profile"
              className="profile-img"
            />
          </Link>
          <div className="dropdown-menu" aria-labelledby="fashionDropdown">
            <Link to="/profile" className="dropdown-item">My Profile</Link>
            { window.localStorage.getItem('token') && role === 'adminserver' ?
            <>
            <Link to="/auth" className="dropdown-item">Auth</Link>
            </>
            :(
              null)}
            <Link to="/notifications" className="dropdown-item">Notifications</Link>
            <Link to="/help" className="dropdown-item">Help</Link>
            <Link to="/dealing" className="dropdown-item">dealing</Link>
            <button onClick={handleLogout} className="dropdown-item logout-btn">Logout</button>
          </div>
        </div>
        )}
      </div>
      <hr />
    </nav>
    <div className={`part2 ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="navlink">
        <Link to="/" className="links">Home</Link>

        {/* FASHION Dropdown */}
        <div className="dropdown">
          <Link
            to="/fashion" 
            className="links dropdown-toggle"
            role="button"
            id="fashionDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            FASHION
          </Link>
          <ul className="dropdown-menu" aria-labelledby="fashionDropdown">
            <li><Link className="dropdown-item" to="/fashion/men">Men</Link></li>
            <li><Link className="dropdown-item" to="/fashion/women">Women</Link></li>
            <li><Link className="dropdown-item" to="/fashion/kids">Kids</Link></li>
          </ul>
        </div>

        {/* ELECTRONICS Dropdown */}
        <div className="dropdown">
          <Link
            to="/products"
            className="links dropdown-toggle"
            role="button"
            id="electronicsDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            ELECTRONICS
          </Link>
          <ul className="dropdown-menu" aria-labelledby="electronicsDropdown">
            <li><Link className="dropdown-item" to="/electronics/computers">Computers</Link></li>
            <li><Link className="dropdown-item" to="/electronics/TV">TV</Link></li>
            <li><Link className="dropdown-item" to="/electronics/mobiles">Mobiles</Link></li>
            <li><Link className="dropdown-item" to="/electronics/laptops">Laptops</Link></li>
            <li><Link className="dropdown-item" to="/electronics/tablets">Tablets</Link></li>
            <li><Link className="dropdown-item" to="/electronics/cameras">Cameras</Link></li>
            <li><Link className="dropdown-item" to="/electronics/headphones">Headphones</Link></li>
            <li><Link className="dropdown-item" to="/electronics/watches">Watches</Link></li>
            <li><Link className="dropdown-item" to="/electronics/home-audio">Home Audio</Link></li>
            <li><Link className="dropdown-item" to="/electronics/gaming">Gaming</Link></li>
            <li><Link className="dropdown-item" to="/electronics/home-electronics">Home Electronics</Link></li>
          </ul>
        </div>
        {/* BEAUTY  Dropdown */}
        <div className="dropdown">
          <Link
            to="/beauty"
            className="links dropdown-toggle"
            role="button"
            id="beautyDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            BEAUTY 
          </Link>
          <ul className="dropdown-menu" aria-labelledby="beautyDropdown">
            <li><Link className="dropdown-item" to="/beauty/makeup">Makeup</Link></li>
            <li><Link className="dropdown-item" to="/beauty/skincare">Skincare</Link></li>
            <li><Link className="dropdown-item" to="/beauty/hair">Hair</Link></li>
          </ul>
        </div>
        {/* ACCESSORIES Dropdown */}
        <div className="dropdown">
          <Link
            to="/accessories"
            className="links dropdown-toggle"
            role="button"
            id="accessoriesDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            ACCESSORIES
          </Link>
          <ul className="dropdown-menu" aria-labelledby="accessoriesDropdown">
            <li><Link className="dropdown-item" to="/accessories/jewellery">Jewellery</Link></li>
            <li><Link className="dropdown-item" to="/accessories/clothing">Clothing</Link></li>  
          </ul>
        </div>
        {/* HEALTH Dropdown */}
        <div className="dropdown">
          <Link
            to="/health"
            className="links dropdown-toggle"
            role="button"
            id="healthDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            HEALTH
          </Link>
          <ul className="dropdown-menu" aria-labelledby="healthDropdown">
            <li><Link className="dropdown-item" to="/health/medicines">Medicines</Link></li>
            <li><Link className="dropdown-item" to="/health/supplements">Supplements</Link></li>
            </ul>
        </div>
        {/* GROSARIES Dropdown */}
        <div className="dropdown">
          <Link
            to="/groceries"
            className="links dropdown-toggle"
            role="button"
            id="groceriesDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            GROCERY
          </Link>
          <ul className="dropdown-menu" aria-labelledby="groceriesDropdown">
            <li><Link className="dropdown-item" to="/groceries/vegetables">Vegetables</Link></li>
            <li><Link className="dropdown-item" to="/groceries/fruits">Fruits</Link></li>
            <li><Link className="dropdown-item" to="/groceries/meat">Meat</Link></li>
            <li><Link className="dropdown-item" to="/groceries/dairy">Dairy</Link></li>
            <li><Link className="dropdown-item" to="/groceries/bakery">Bakery</Link></li>
            <li><Link className="dropdown-item" to="/groceries/snacks">Snacks</Link></li>
          </ul>
  
        </div>
        {/* BOOKs Dropdown */}
        <div className="dropdown">
          <Link
            to="/books"
            className="links dropdown-toggle"
            role="button"
            id="booksDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            BOOKS
          </Link>
          <ul className="dropdown-menu" aria-labelledby="booksDropdown">
            <li><Link className="dropdown-item" to="/books/fiction">Fiction</Link></li>
            <li><Link className="dropdown-item" to="/books/non-fiction">Non-Fiction</Link></li>
            <li><Link className="dropdown-item" to="/books/history">History</Link></li>
            <li><Link className="dropdown-item" to="/books/science">Science</Link></li>
            <li><Link className="dropdown-item" to="/books/politics">Politics</Link></li>
            </ul>
        </div>
       
      </div>
    </div>
    <button onClick={Top} ref={last} className="topbtn"><i className="fas fa-arrow-up"></i></button>
    </div>
  );
};

export default NavBar;
