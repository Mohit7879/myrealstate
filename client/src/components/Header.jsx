import {FaSearch} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header  className='bg-slate-200 '>
        <div className='flex justify-between  items-center max-w-6xl'  >
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
          <Link to='/signin'>   <li  className="hover:underline">Sign in</li></Link>
         
        </ul>
             </div>
    </header>
  )
}
