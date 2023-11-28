import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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
    const [price ,setPrice]=useState(null)

    useEffect(()=>{
        const fetchListing=async ()=>{
            console.log("inside listing");
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
  
    if(listingData&&listingData.offer){

        setPrice(listingData.regularPrice-listingData-discountPrice)

    }
  return (
  
    <main>

   <p> {loading?'loading...':''}</p>
   
   
  {
   listingData&&
   <Swiper navigation>
    {listingData.imageurls.map((image)=>(
       
      
        <SwiperSlide key={image}>
             <div
             
             className='h-[550px]  '
             style={{background:`url(${image}) center no-repeat  `, }}
             ></div>
        </SwiperSlide>
       

    ))}
   </Swiper>
  }


      <div>{listingData&&(listingData.furnished?<h1>Furnished</h1>:""&&listingData.parking?<p>Parking</p>:"")}</div>
     <div>{listingData&&(<p>{listingData.address}</p>)}</div>
  {listingData&&(<p>{listingData.bedrooms}</p>)}
  {listingData&&(<p>{listingData.bathrooms}</p>)}
{listingData&&(<p>{listingData.description}</p>)} 

 
  
   
  
 </main>
   
  )
}
