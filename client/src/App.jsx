
import {BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import SignOut from './pages/SignOut';
import Header from './components/Header';
import About from './pages/about';


export default function App() {
  return (
    <>
    
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/signout" element={<SignOut/>} />
      <Route path="/about" element={<About/>} />
     
    </Routes>
  </BrowserRouter>
  </>
  
  )
}