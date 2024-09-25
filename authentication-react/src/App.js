import { Link, Route, Routes } from 'react-router-dom';
import Login from './pages/authentication/regester & login/login';
import Signup from './pages/authentication/regester & login/signup';
import Auth from './pages/authentication/userdata/auth';
import ShowAuth from './pages/authentication/userdata/show';
import Update from './pages/authentication/userdata/updates';
import NavBar from './pages/authentication/navbar/nav';
import Profile from './pages/authentication/userdata/profile';
import Home from './pages/homepage/home';
import  useTokenDecoder  from './pages/authentication/jwt/useTokenDecoder';
import NotFound from './pages/homepage/NotFound';

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
        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </>
  );
}

export default App;
