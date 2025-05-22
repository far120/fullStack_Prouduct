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
    <nav className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-2">
        <Link to="/">
          <img src={images} alt="Logo" className="w-40 h-16 object-contain" />
        </Link>
        <div className="flex-1 flex justify-center">
          <input type="text" className="w-full max-w-xs px-4 py-2 rounded-full border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Search..." />
        </div>
        <div className="flex items-center space-x-4 relative">
          <Link to="/wishlist" className="relative flex items-center hover:text-yellow-300">
            <i className="fas fa-heart mr-1"></i> Wishlist
          </Link>
          <Link to="/cart" className="relative flex items-center hover:text-yellow-300">
            <i className="fas fa-cart-shopping mr-1"></i> Cart
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs rounded-full px-2 py-0.5 text-black font-bold">{cart?.length || 0}</span>
          </Link>
          {!localStorage.getItem("token") ? (
            <>
              <Link to="/signup" className="px-4 py-2 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition">Signup</Link>
              <Link to="/login" className="px-4 py-2 bg-blue-600 rounded-lg font-bold hover:bg-blue-700 transition">Login</Link>
            </>
          ) : (
            <div className="relative" tabIndex={0}>
              <img src={`${BackEnd_url}/images/uploads/${avatar}`} alt="..." className="w-12 h-12 rounded-full border-2 border-yellow-400 cursor-pointer" onClick={e => {
                e.stopPropagation();
                const menu = document.getElementById('user-dropdown-menu');
                if (menu) menu.classList.toggle('hidden');
              }} />
              <ul
                id="user-dropdown-menu"
                className="hidden absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg transition pointer-events-auto z-50"
                tabIndex={0}
                onBlur={e => e.currentTarget.classList.add('hidden')}
              >
                <li><Link to="/profile" className="block px-4 py-2 hover:bg-blue-100" onClick={() => document.getElementById('user-dropdown-menu').classList.add('hidden')}>My Profile</Link></li>
                {role === 'adminserver' && (
                  <>
                    <li><Link to="/auth" className="block px-4 py-2 hover:bg-blue-100" onClick={() => document.getElementById('user-dropdown-menu').classList.add('hidden')}>Auth</Link></li>
                    <li><Link to="/allproducts" className="block px-4 py-2 hover:bg-blue-100" onClick={() => document.getElementById('user-dropdown-menu').classList.add('hidden')}>AllProducts</Link></li>
                  </>
                )}
                {(role === 'adminserver' || role === 'admin') && (
                  <>
                    <li><Link to={`/addproduct/${userid}`} className="block px-4 py-2 hover:bg-blue-100" onClick={() => document.getElementById('user-dropdown-menu').classList.add('hidden')}>Addproducts</Link></li>
                    <li><Link to={`/myproducts`} className="block px-4 py-2 hover:bg-blue-100" onClick={() => document.getElementById('user-dropdown-menu').classList.add('hidden')}>Myproducts</Link></li>
                  </>
                )}
                <li><Link to={`/dashboard/${userid}`} className="block px-4 py-2 hover:bg-blue-100" onClick={() => document.getElementById('user-dropdown-menu').classList.add('hidden')}>Dashboard</Link></li>
                <li><Link to="/notifications" className="block px-4 py-2 hover:bg-blue-100" onClick={() => document.getElementById('user-dropdown-menu').classList.add('hidden')}>Notifications</Link></li>
                <li><Link to="/help" className="block px-4 py-2 hover:bg-blue-100" onClick={() => document.getElementById('user-dropdown-menu').classList.add('hidden')}>Help</Link></li>
                <li><hr className="my-1 border-gray-200" /></li>
                <li><button onClick={() => { document.getElementById('user-dropdown-menu').classList.add('hidden'); handleLogout(); }} className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600">Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <button onClick={Top} ref={last} className="fixed bottom-8 right-8 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-900 transition z-50" style={{display:'none'}}>
        <i className="fas fa-arrow-up"></i>
      </button>
    </nav>
    <Navlinks />
  </>
);
}

export default NavBar;
