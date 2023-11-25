
import React from 'react'
import { useState } from 'react'
import {getStorage,ref, uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { app } from "../firebase";
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';




export default function Listing() {
    const [file,setFile]= useState(undefined);
    const[loading , setLoading]=useState(false)
    const[error , setError]=useState(null)
    const {currentUser}=useSelector(state=>state.user);
  const [message,setMessage]=useState('')
  const Navigate=useNavigate();


  
    const [formData,SetFormData]= useState({
        imageurls:[],
        name:"",
        description:"",
        address:'',
        type:'rent',
        bedrooms:1,
        bathrooms:1,
        regularPrice:0,
        discountPrice:0,
        offer:false,
        parking:false,
        furnished:false,
        userRef:currentUser._id,
    });

    console.log(formData);

     const handleimageSubmit= async()=>{

          const storage=getStorage(app)
            const fileName= new Date().getTime()+file.name;
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef,fileName);
        
            uploadTask.on(
               'state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             
              },
              (error) => {
                console.error(error,"firebase error");
              },
          () => {
           
           
             // Upload complete
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          
              SetFormData({...formData,imageurls:formData.imageurls.concat(url)})
                   
                })

              
              
      }
      )
           
         
      }

      const handlechange=(e)=>{
        if(e.target.id==='sale'||e.target.id==='rent'){
           
            SetFormData({
                ...formData,
                type:e.target.id
            })
        }

        if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer'){
            SetFormData({
                ...formData,
                [e.target.id]:e.target.checked
            })
        }

        if(e.target.type==='text'||e.target.type==='number'||e.target.type==='textarea'){
            SetFormData({
                ...formData,
                [e.target.id]:e.target.value
            })
        }
    }
      
    
    const handleRemoveImage=(index)=>{
        SetFormData({
            ...formData,
            imageurls:formData.imageurls.filter((_,i)=>i!==index)

        })

    }

    const handleSubmit=async (e)=>{

        e.preventDefault();
        if(formData.imageurls.length<1){
            return setError('you must upload atleast one image ')
        }

        if(formData.regularPrice<formData.discountPrice){
            return setError('Regular price should be greater than Discounted Price ')
        }
     setMessage(null)
     setError(null)
    let data='';
       
        setLoading(true)

        try{

        const res = await fetch(`/api/listing/create`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
            },
      
            
            body:JSON.stringify(formData )
               
            
      
          });

          setLoading(false)

           data= await res.json()
                  console.log(data);
                  if(data.success===false){
                    setError(data.message);
                 
                  }else{
                    setMessage("listing created successfully");
                  }
          
               
          Navigate(`/listing/${data._id}`)
       
        }catch(err){
            
          setError(data.message);
          
        }



    }
       
          

    

   

  return (
   <main className='p-4  max-w-4xl mx-auto '>
    <h1 className='font-semibold text-center text-3xl my-7'>Create Listing</h1>
   <form className='flex flex-col sm:flex-row gap-4 '>
    <div className=' flex flex-col flex-1 gap-3'>
        <input onChange={handlechange} value={formData.name } type='text' placeholder='Name' id='name' className='border p-3 rounded-lg' required></input>
        <textarea  onChange={handlechange} value={formData.description } type='text' placeholder='Description' id='description' className='border p-3 rounded-lg'></textarea>
        <input type='text'  onChange={handlechange} value={formData.address } placeholder='Address' id='address' className='border p-3 rounded-lg'></input>

                    <div className='flex flex-wrap gap-3'>
            <div className='flex gap-3 '> 
                <input  onChange={handlechange} checked={formData.type==='sale'} type='checkbox' id='sale' className='w-5 gap-x-4'></input>
                <span>Sell</span>
            </div>

            <div className='flex gap-3 '> 
                <input  onChange={handlechange} checked={formData.type==='rent'} type='checkbox' id='rent' className='w-5 gap-x-4'></input>
                <span>Rent</span>
            </div>
            <div className='flex gap-3 '> 
                <input   onChange={handlechange} checked={formData.parking} type='checkbox' id='parking' className='w-5 gap-x-4'></input>
                <span>Parking</span>
            </div>

            <div className='flex gap-3 '> 
                <input  onChange={handlechange} checked={formData.furnished} type='checkbox' id='furnished' className='w-5 gap-x-4'></input>
                <span>Furnished</span>
            </div>

            <div className='flex gap-3 '> 
                <input onChange={handlechange} checked={formData.offer} type='checkbox' id='offer' className='w-5 gap-x-4'></input>
                <span>Offer</span>
            </div>

            </div>
    

        <div className='flex flex-wrap gap-5'>
        <div className='flex items-center gap-3'>
            <input  onChange={handlechange} value={formData.bedrooms } type="number"  id='bedrooms' min="1" max="10" className='border border-gray-300 rounded-lg p-3' required/>
            <p>Beds</p>
        </div>
        <div className='flex items-center gap-3'>
            <input  onChange={handlechange} value={formData.bathrooms } type="number"  id='bathrooms' min="1" max="10" className='border border-gray-300 rounded-lg p-3' required/>
            <p>Bathrooms</p>
        </div>
        <div className='flex items-center gap-3'>
            <input  onChange={handlechange} value={formData.regularPrice } type="number"  id='regularPrice' min="1" max="10" className='border border-gray-300 rounded-lg p-3' required/>
          
            <div  className='flex flex-col items-center'>
            <p>Regular Price</p>
            {formData.type==='rent'?  <span  className='text-xs'>(Rs/month)</span>:""}
          
            </div>
        </div>
        {formData.offer&& <div className='flex flex-col items-center'>
        <div className='flex items-center gap-3'>
            <input   onChange={handlechange} value={formData.discountPrice } type="number"  id='discountPrice' min="1" max="10" className='border border-gray-300 rounded-lg p-3' required/>
         
            <p>Discounted Price</p>
            {formData.type==='rent'?  <span  className='text-xs'>(Rs/month)</span>:""}
            </div>
           
        </div>}
        </div>
       
    </div>

         {/* right side  */}
  <div className=' flex flex-col flex-1 ml-4 gap-5'>
    <div className=' my-3'>
        
        <p className='font-semibold flex flex-row'>Images:
        <span className='font-normal text-gray-600 '>The first image will be cover  </span></p>
    </div>

    <div className='flex gap-2'>
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' id='images' accept='image/*' className='border  border-gray-300 rounded p-3'></input>
        <button  type="button" onClick={handleimageSubmit}  className=' p-1 border border-gray-300 rounded hover:shadow-lg text-green-700'>Upload</button>
     
    </div>

    { formData.imageurls.map((url,index)=>(
       <div key={index}  className='flex justify-between '>
        <img src={url} alt="image" />
       <button onClick={()=>handleRemoveImage(index)} type='button'className='p-3 text-orange-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-75'>delete</button>
       </div>
       ))}
         
       <button  onClick={handleSubmit} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-75'> {loading?'Creating...':"Create listing"} </button>
          {error&&<p  className='text-red-700 flex justify-center'> {error}</p>}
          <h1 className='text-green-700 flex justify-center'>{message}</h1>
       </div>
   </form>
   
   </main>
  )
}
