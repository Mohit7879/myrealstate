import {FaSearch} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Header() {
  const {currentUser} = useSelector(state=>state.user);
  
  
  return (
    <header  className='bg-slate-200 '>
        <div className='flex justify-between  items-center max-w-6xl' >
        <h1 className='font-bold text-sm sm:text-xl flex '>
             <span className='text-slate-500'>TheReal</span>
              <span className='text-slate-700'>Estate</span>
        </h1>
        <form className='p-3 rounded-lg flex items-center bg-slate-100' >
            <input type="text" placeholder='Search...' className='padding:10px focus:outline-none '/>
            <FaSearch/>
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
