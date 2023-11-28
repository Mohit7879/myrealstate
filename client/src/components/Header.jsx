import {FaSearch} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


export default function Header() {
  const {currentUser} = useSelector(state=>state.user);
  const [ searchTerm,setsearchTerm] = useState('');
  const navigate=useNavigate();
  const handleSubmit=(e)=>{
   
    e.preventDefault();
    if(searchTerm){
    
      const urlparams= new URLSearchParams(window.location.search);
      urlparams.set('searchTerm',searchTerm);
      const searchQuery=urlparams.toString();
      console.log(searchQuery);
      navigate(`/search?${searchQuery}`);
    }
  }

    useEffect(()=>{
      const urlparams= new URLSearchParams(location.search);
      const searchTermfromUrl=urlparams.get('searchTerm');
      if(searchTermfromUrl){

        setsearchTerm(searchTermfromUrl)

      }
    },[location.search])
  
 
  
  return (
    <header  className='bg-slate-200 '>
        <div className='flex justify-between  items-center max-w-6xl' >
        <h1 className='font-bold text-sm sm:text-xl flex '>
             <span className='text-slate-500'>TheReal</span>
              <span className='text-slate-700'>Estate</span>
        </h1>
        <form  onSubmit={handleSubmit} className='p-3 rounded-lg flex items-center bg-slate-100' >
            
            <input value={searchTerm} onChange={(e)=>setsearchTerm(e.target.value)} type="text" placeholder='Search...' className='padding:10px focus:outline-none '/>
            <button>
            <FaSearch/>
            </button>
         
        </form>

        <ul className="flex gap-4">
            <Link to='/'>  <li className="hover:underline"> Home</li></Link>
          <Link to='/about'>  <li  className="hover:underline">About</li></Link>
          {currentUser? <Link to='/profile'><li  className="hover:underline"><img  className="w-8 h-8 rounded-full "    src={currentUser.avatar} alt="profile"/></li></Link>:""}
         
        </ul>
             </div>
    </header>
  )
}
