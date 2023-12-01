import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {MdLocationOn} from 'react-icons/md'
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Showlisting() {
    SwiperCore.use([Navigation])
    const params=useParams();
    const [ listingData,setlistingData]=useState(null)
    const [ error,setError]=useState(false)
    const [loading,setloading]=useState(false)
  

    useEffect(()=>{
        const fetchListing=async ()=>{
         
            try {
            setloading(true);
            const res =  await fetch(`/api/listing/getlisting/${params.listingid}`)
            const data = await res.json();
          
            if(data.success===false){
                setError(data.message)
                setloading(false)

            }

            setlistingData(data);
            setloading(false)
            console.log(data);

                
            } catch (err) {

                setError(err)
             
        
            
        }

       
    }
    fetchListing()
    },[params.listingid])
  
  return (
  
    <main  >

   <p> {loading?'loading...':''}</p>
   
   
  {
   listingData&&
   <Swiper navigation>
    {listingData.imageurls.map((image)=>(
       
      
        <SwiperSlide key={image}>
             <div
             
             className='h-[250px]  '
             style={{background:`url(${image}) center no-repeat  `, }}
             ></div>
        </SwiperSlide>
       

    ))}
   </Swiper>
  }
<div className='flex flex-col gap-2 max-w-5xl mx-auto'>
<div>{listingData&&(  <p className='text-lg truncate font-semibold'>{listingData.name}</p>)}</div>


    
    
     {listingData&&(<div className='flex items-center gap-1'>   < MdLocationOn className='h-4 w-4 text-red-400'/><p className='text-sm text-gray-600 truncate'>{listingData.address}</p></div>)}
  {listingData&&(<div className='flex gap-3'>
    <div className='flex gap-1'>
    <p>{listingData.bedrooms}</p>
    <p>bedroom</p>
    </div>

    <div className='flex gap-1'>
    <p>{listingData.bathrooms}</p>
    <p>bathroom</p>
    </div>
  
    <div>{listingData&&(listingData.furnished?<h1>Furnished</h1>:""&&listingData.parking?<p>Parking</p>:"")}</div>
</div>)}
  


{listingData&&(<p>${listingData.offer?listingData.discountPrice.toLocaleString('en-US'):listingData.regularPrice.toLocaleString('en-US')}{listingData.type==='rent'?'/month':""}</p>)}
{listingData&&(<p className='text-2xl text-gray-700 line-clamp-3'>{listingData.description}</p>)} 
   </div>
  
 </main>
   
  )
}
