
import {BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './components/Header';
import About from './pages/About';
import PrivateRoute from './components/PrivateRoute';
import Listing from './pages/Listing';
import Showlisting from './pages/Showlisting';
import Search from './pages/Search';



export default function App() {
  return (
    <>
    
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
    
     
   
      <Route  element={<PrivateRoute/>} >
      <Route path="/profile" element={<Profile/>} />
         <Route path="/listing" element={<Listing/>} />
         <Route path="/home" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/getlisting/:listingid" element={<Showlisting/>} />
      </Route>
     
    </Routes>
  </BrowserRouter>
  </>
  
  )
}