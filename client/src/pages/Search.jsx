import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Listingcart from '../components/Listingcart';




export default function Search() {


    const Navigate=useNavigate();
    const [ loading,setloading]=useState(false)
    const [ searchData,setsearchData]=useState('');
    const [ showmore,setshowmore]=useState(false);

    const {searchterm} =useSelector(state=>state.user)
  
  

    const [ sidebarData , setSidebarData]=useState({

        searchTerm:searchterm,
        type:'all',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc',

    })

   console.log(sidebarData);

   useEffect(()=>{
  
    const currentUrl = location.search;
    const urlParams = new URLSearchParams(currentUrl);
    const offer = urlParams.get('offer');
    console.log(offer);
    const seachterm = urlParams.get('searchTerm');
    const type = urlParams.get('type');
    const parking = urlParams.get('parking');
    const furnished = urlParams.get('furnished');
    const order = urlParams.get('order');
    const sort = urlParams.get('sort');
    console.log(seachterm);

    if(
        offer||seachterm||type||parking||furnished||order||sort
    ){

        console.log(type);
        setSidebarData(
            {
                offer:offer==='true'?true:false,
                parking:parking==='true'?true:false,
                furnished:furnished==='true'?true:false,
                searchTerm:seachterm||'',
                type:type||'all',
                sort:sort|| 'created_at',
                order:order|| 'desc'

            }
        )
    }


    const fetchdata=async ()=>{
        const query=urlParams.toString()
        const res=await fetch(`/api/listing/get?${query}`);
        const data=await res.json();
         if(data.length>8){
            setshowmore(true)
         }
        console.log(showmore);
        setsearchData(data);
        setloading(false);


    }

    fetchdata();
    
   },[location.search])

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

        if(e.target.id==='sort_order'){
               
            const sort=e.target.value.split('_')[0] || 'created_at';
            const order=e.target.value.split('_')[1] || 'desc';
             
            setSidebarData({...sidebarData,sort,order});
         
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
              console.log(searchQuery);
          Navigate(`/search?${searchQuery}`);

        
       

        const Query=urlparams.toString();
        const res=await fetch(`/api/listing/get?${Query}`);
        const data=await res.json();
         if(data.length>8){
            setshowmore(true)
         }
        console.log(showmore);
        setsearchData(data);
        setloading(false);

        

       }

       const handleshowmore=async ()=>{

        const numberoflisting=searchData.length
        const startindex=numberoflisting;
       const urlparams= new URLSearchParams(location.search)
     
       urlparams.set('startIndex',startindex);
    
       const searchquery=urlparams.toString();
       console.log(searchquery,"params");
       const res=await fetch(`/api/listing/get?${searchquery}`);
       const data=await res.json();
        if(data.length>8){
           setshowmore(false)
        }
        setsearchData([...searchData,...data])
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
       
       
        <div className="flex-1" >
            <h1 className='text3xl text-center font-semibold border-b-2 text-slate-700 mt-5'>Listing Result</h1>
           <div>
                  {!loading&&searchData.length===0&&(
                   <p  className='text-xl text-center mt-28 text-slate-700'>No Result Found</p>
                   )} 
                   {loading&&<p className='text-xl text-center text-blue-700'>loading...</p>}
                  
            </div>

            <div className='flex flex-wrap'>
            {
                    !loading&&searchData&&searchData.map((listing)=>(
                        <Listingcart  key={listing._id} listing={listing}/>

                    ))
                   }
            </div>

           { showmore&&<button onClick={handleshowmore} className= ' text-green-600 hover:underline mx-4 rounded-lg'>show more</button> }
        </div>

      
              
    </div>
  )
}

