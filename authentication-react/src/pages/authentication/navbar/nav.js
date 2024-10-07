import { useContext, useEffect, useRef, useState } from 'react'; // Add useState
import { Link, useNavigate } from 'react-router-dom';
import { Mycontext } from '../regester & login/context';
import './nav.css';
import useTokenDecoder from '../jwt/useTokenDecoder';
import images from "./img/gradient-instagram-shop-logo-template_23-2149704603.avif";

const NavBar = () => {
  const last =useRef()
  const { value, setValue } = useContext(Mycontext);
  const [links , setlinks] = useState([])
  const navigate = useNavigate();


// get category to be link

  useEffect(() => {
    fetch("http://localhost:2004/api/category")
    .then(res => res.json())
    .then(data => setlinks(data))
  },[]);

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
            to="/" 
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

              { window.localStorage.getItem('token') &&( role === 'adminserver' || role === 'admin') ?
            <>
            <Link to={`/addproduct/${userid}`} className="dropdown-item">Addproducts</Link>
            <Link to={`/myproducts`} className="dropdown-item">Myproducts</Link>
            </>
            :(
              null)}
            <Link to={`/dashboard/${userid}`} className="dropdown-item">Dashboard</Link>
            <Link to="/notifications" className="dropdown-item">Notifications</Link>
            <Link to="/help" className="dropdown-item">Help</Link>
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
        {Array.isArray(links) && links.length > 0 ? (
          links.map((item) => (
            <div className="dropdown" key={item._id}>
              <Link
                to={`/${item.name}`}
                className="links dropdown-toggle"
                role="button"
                id={`${item.name}Dropdown`}
                aria-expanded="false"
              >
                {item.name}
              </Link>
              <ul className="dropdown-menu" aria-labelledby={`${item.name}Dropdown`}>
                {item.subcategory.map((subcategory, index) => (
                  <li key={index}>
                    <Link className="dropdown-item" to={`/${item.name}/${subcategory}`}>
                      {subcategory}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No links available</p>
        )}
       
      </div>
    </div>
    <button onClick={Top} ref={last} className="topbtn">
      <i className="fas fa-arrow-up"></i>
    </button>
  </div>
)
}

export default NavBar;
