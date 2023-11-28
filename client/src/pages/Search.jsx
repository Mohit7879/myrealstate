import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


export default function Search() {
    const Navigate=useNavigate();
    const [ loading,setloading]=useState(false)
    const [ searchData,setsearchData]=useState('');

    const search =useSelector(state=>state.search)
  
    

    const [ sidebarData , setSidebarData]=useState({

        searchTerm:'test',
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'createdAt_desc',
        order:'',

    })

   

    const handleChange=(e)=>{

        if(e.target.id==='all'||e.target.id==='rent'||e.target.id==='sale'){
            setSidebarData({...sidebarData,type:e.target.id})
        }

        if(e.target.id==='searchTerm'){
            setSidebarData({...sidebarData,searchTerm:e.target.value})
        }

        if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer'){
            setSidebarData({...sidebarData,[e.target.id]:e.target.checked})
        }

        if(e.target.value==='regulaPrice_desc'||e.target.value==='regulaPrice_asc'){

          
            setSidebarData({...sidebarData,order:e.target.value,sort:""});
        }

        if(e.target.value==='createdAt_desc'||e.target.value==='createdAt_asc'){

          
            setSidebarData({...sidebarData,sort:e.target.value,order:""});
        }

    }

    const handleSubmit=async (e)=>{
             setloading(true);
        e.preventDefault();
        const urlparams=new URLSearchParams();
        urlparams.set('searchTerm',sidebarData.searchTerm);
        urlparams.set('type',sidebarData.type);
        urlparams.set('parking',sidebarData.parking);
        urlparams.set('furnished',sidebarData.furnished);
        urlparams.set('offer',sidebarData.offer);
        urlparams.set('sort',sidebarData.sort);
        urlparams.set('order',sidebarData.order);
        const searchQuery=urlparams.toString();
        Navigate(`search${searchQuery}`)

        
       

        const Query=urlparams.toString();
        const res=await fetch(`/api/listing/get?${Query}`);
        const data=await res.json();
        console.log(data);
        setsearchData(data);
        setloading(false);

        

       }







  return (
    <div className='flex flex-col md:flex-row'>
       < div className="mt-3 border-b-2 md:border-r-2 md:min-h-screen w-1/3">
        < form onSubmit={handleSubmit} className='flex gap-2 flex-col' >
            <div className='flex'>
          <label className=' m-4'> Search </label>
          <input value={sidebarData.searchTerm} onChange={handleChange} type="text " id='searchTerm' placeholder='search...' className='border p-3 rounded-lg w-full'/>
          </div>
       <div className='flex  gap-8  items-center m-3 md:flex-wrap '>
       <label >Amenities:</label>
        <div  className=' flex gap-2' >
      <input   checked={sidebarData.parking} onChange={handleChange}  type="checkbox" id='parking' className='w-5'/>
        <span>Parking</span>
        </div>

       

        <div  className='flex gap-2 '>
       
         <input   checked={sidebarData.furnished} onChange={handleChange}   type="checkbox" id='furnished' className='w-5'/>
        <span>Furnished </span>
        </div>

       </div>

        <div className='flex  gap-8  items-center m-3 md:flex-wrap '>
       <label >Type:</label>
        <div  className=' flex gap-2' >
      <input  checked={sidebarData.type==='all'} onChange={handleChange}  type="checkbox" id='all' className='w-5'/>
        <span>Rent & Sale</span>
        </div>

       

        <div  className='flex gap-2 '>
       
         <input   checked={sidebarData.type==='rent'} onChange={handleChange}  type="checkbox" id='rent' className='w-5'/>
        <span>Rent </span>
        </div>

        <div  className='flex gap-2'>
       
         <input   checked={sidebarData.type==='sale'}onChange={handleChange}  type="checkbox" id='sale' className='w-5'/>
        <span> Sale</span>
        </div>

        <div  className='flex gap-2'>
     
         <input  checked={sidebarData.offer} onChange={handleChange}  type="checkbox" id='offer' className='w-5'/>
        <span>Offer</span>
        </div>

        </div>

        <div className='flex items-center gap-2'>
            <label >Sort : </label>
            <select onChange={handleChange} defaultValue={'created_at_desc'} id='sort_order' className='border rounded-lg p-3'>
                <option value='regulaPrice_desc'>Price high to low</option>
                <option value='regulaPrice_asc'>Price low to high</option>
                <option value='createdAt_desc'>Latest</option>
                <option value='createdAt_asc'>Oldest</option>
            </select>
        </div>

        <button className='bg-slate-700 text-white rounded-lg p-3 m-6 hover:opacity-95'>Search</button>

        </form>
        
       </div>
       
       

      
       
       

      
        <div className=""><h1 className='text3xl font-semibold border-b-2 text-slate-700 mt-5'>Listing Result:</h1> </div>
      
    </div>
  )
}

