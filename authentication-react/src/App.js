import { Link, Route, Routes } from 'react-router-dom';
import { Mycontext } from './pages/authentication/regester & login/context';
import { useContext, useEffect } from 'react';
import Links from './pages/website pages/validation/links';
import Login from './pages/authentication/regester & login/login';
import Signup from './pages/authentication/regester & login/signup';
import Auth from './pages/authentication/userdata/auth';
import ShowAuth from './pages/authentication/userdata/show';
import Update from './pages/authentication/userdata/updates';
import NavBar from './pages/authentication/navbar/nav';
import Profile from './pages/authentication/userdata/profile';
import Home from './pages/website pages/home page/home';
import  useTokenDecoder  from './pages/authentication/jwt/useTokenDecoder';
import NotFound from './pages/website pages/validation/NotFound';
import Footer from './pages/website pages/footer/footer'
import Aside from './pages/website pages/aside/aside';
import Maincategories from './pages/website pages/categories/maincategories';
import Categorypages from './pages/website pages/categories/categorypages';
import Updatecategory from './pages/website pages/categories/updatecategory';
import Addproducts from './pages/website pages/categories/add';
import Myproducts from './pages/website pages/categories/myproducts';
import Dashboard from './pages/website pages/categories/dashboard';
import Wishlist from './pages/website pages/categories/whishlist';
import Cart from './pages/website pages/categories/cart';





function App() {
  const{ params , setparams} = useContext(Mycontext)
  const tokendata = useTokenDecoder();
  const role = tokendata?.role; 
  console.log(role);

  return (
    <>
      <NavBar />
      <Links/>
      <Routes>
        <Route exact path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


    
{window.localStorage.getItem("token")?(
<>
        {role == "adminserver" ? (
          <>
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/:id" element={<ShowAuth />} />
            
          </>
        ) : (
          <Route path="*" element={<NotFound />} />  
        )}

        <Route path="/updates/:id" element={<Update />} /> 
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/aside" element={<Aside />} /> */}
        <Route path="/maincategories" element={<Maincategories />} />
        <Route path={`/${params}`} element={<Categorypages />} />
        <Route path="/product/:productid/:userid" element={<Updatecategory />} />
        <Route path="/addproduct/:userid" element={<Addproducts />} />
        <Route path="/myproducts" element={<Myproducts />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
       

   

        <Route path="*" element={<NotFound />} /> 
</>
):
(
  <Route path="*" element={<NotFound />} /> 

)}
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
