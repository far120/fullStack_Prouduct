import { Link, Route, Routes } from 'react-router-dom';
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
import Clothes from './pages/website pages/categories/clothes/clothes';
import Man from './pages/website pages/categories/clothes/subcategory/man';
import Woman from './pages/website pages/categories/clothes/subcategory/woman';
import Boy from './pages/website pages/categories/clothes/subcategory/boy';
import Girl from './pages/website pages/categories/clothes/subcategory/girl';



function App() {
  const tokendata = useTokenDecoder();
  const role = tokendata?.role; 
  console.log(role);

  return (
    <>
      <NavBar />
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
        <Route path="/clothes" element={<Clothes />} />
        <Route path="clothes/man" element={<Man />} />
        <Route path="clothes/woman" element={<Woman />} />
        <Route path="clothes/boy" element={<Boy />} />
        <Route path="clothes/girl" element={<Girl />} />

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
