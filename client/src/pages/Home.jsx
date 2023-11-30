import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper,SwiperSlide } from "swiper/react";
import 'swiper/css/bundle'
import SwiperCore from 'swiper'
import { Navigation } from "swiper/modules";
import Listingcart from "../components/listingcart";

export default function Home() {

  const [offer,setoffer]=useState([]);
  const [sale,setsale]=useState([]);
  const [rent,setrent]=useState([]);
  SwiperCore.use([Navigation])
  console.log(offer);
try{
  useEffect(()=>{

  const fetchofferlistings=async ()=>{

    const res=await fetch('/api/listing/get?offer=true&limit=4&type=rent');
    const data=await res.json();
    setoffer(data);
    fetchsalelistings()
    
  }

  const fetchsalelistings=async ()=>{

  

      const res=await fetch('/api/listing/get?type=sale&limit=4');
      const data=await res.json();
      setsale(data);
      fetchrentlistings();
      
    

  }

  const fetchrentlistings=async ()=>{


    const res=await fetch('/api/listing/get?type=rent&limit=4');
      const data=await res.json();
      setrent(data)
  

  
}

fetchofferlistings();
},[])

  }catch(err){

  }
  return (
    <div className=" ml-4 ">
      <div  className=" flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
    <div >
      <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">Find your next <span className="text-slate-500">perfect</span><br/>place with ease </h1>
    </div>
    <div className="text-gray-400 text-sm">
      This is the best  place to find your dream home <br/> we have a wide range of property to choose from.
    </div>

    <Link className="text-sm text-blue-800 font-bold hover:underline" to={'/search'}>Lets get started...</Link>
    </div>

    <Swiper navigation>
      {
        offer&&offer.length>0&&offer.map((listing)=>(

          <SwiperSlide>

            <div className="h-[500px]" key={listing.id}    style={{background:`url(${listing.imageurls[0]}) center no-repeat `, backgroundSize:'cover'}}></div>

          </SwiperSlide>

        ))
      }
    </Swiper>

    <div className="mt-8">
      {
        offer&&offer.length>0&&(
          <div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-600">Recent Offers</h2>
          <Link className="text-sm text-blue-800 hover:underline"  to={'search/?offer=true'}>
            show more offers

          </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {
                offer.map((listing)=>(
                  <Listingcart listing={listing} key={listing._id}/>

                ))
              }
            </div>
          </div>
        )
      }
    </div>


    
    <div className="mt-8">
      {
        offer&&offer.length>0&&(
          <div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-600">Recent Places For Rent </h2>
          <Link className="text-sm text-blue-800 hover:underline"  to={'search/?type=rent'}>
            show more places for rent

          </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {
                rent.map((listing)=>(
                  <Listingcart listing={listing} key={listing._id}/>

                ))
              }
            </div>
          </div>
        )
      }
    </div>



    
    <div className="mt-8">
      {
        offer&&offer.length>0&&(
          <div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-600">Recent Places For Sale </h2>
          <Link className="text-sm text-blue-800 hover:underline"  to={'search/?type=sale '}>
            show more places for sale

          </Link>
            </div>
            <div className="flex flex-wrap gap-4 ">
              {
                sale.map((listing)=>(
                  <Listingcart listing={listing} key={listing._id}/>

                ))
              }
            </div>
          </div>
        )
      }
    </div>

    </div>
  )
}