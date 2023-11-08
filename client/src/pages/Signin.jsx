import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";

export default function Signin() {

  const [formData, SetFormData]=useState({});
  const [error, SetError]=useState(null);
  const [loading, SetLoading]=useState(false);
 
  const navigate=useNavigate();

  const handlechange=(e)=>{
   SetFormData({
    ...formData,
    [e.target.id]:e.target.value,
   })

  }

 // console.log(formData);

  const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
  SetLoading(true);
  
    const res = await fetch('/api/auth/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },

      
      body:JSON.stringify(formData),

    });
    const data = await res.json()
    console.log(data.message);
    if(data.success===false){
     
      SetError(data.message);
      SetLoading(false);
      return;
    }
    SetError(null)
    SetLoading(false);
    navigate('/')
   

  }catch(err){

    SetLoading(false);
    SetError(err.message);

  }


  }

  return (
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7" >Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-7 " >
          
          <input type="email" placeholder="email"  className="border p-3 rounded-lg" id="email" onChange={handlechange} />
          <input type="password" placeholder="password"  className="border p-3 rounded-lg" id="password" onChange={handlechange} />
          <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading?'loading...':'Sign in'} </button>
        </form>

        <div className="flex gap-3 mt-5">
          <p>Dont have an account ?</p>
          <Link to={"/signup"}><span className="text-blue-700">Sign up</span> </Link>

        </div>
       { error&&<h1 className="text-red-500  "> ERROR <p1>{error}</p1></h1>}
      </div>
    )
    }
  