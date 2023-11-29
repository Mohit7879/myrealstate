import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'

export default function Listingcart({listing}) {
   
  return (
    <div className='m-5 w-[270px] bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-lg'><Link to={`/listing/${listing._id}`}>

        <img  className='h-[320px]  sm:h-[220px] w-[400px]  rounded-lg 'src={listing.imageurls[0]||'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fhouse%2F&psig=AOvVaw0uKRM2L1j8GmOhbRfUyjUG&ust=1701342433540000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCNDjuNGI6YIDFQAAAAAdAAAAABAE'} alt="image" />
       
<div className='p-3'>  <p className='text-lg truncate font-semibold'>{listing.name}</p>
<div className='flex items-center gap-1'>   < MdLocationOn className='h-4 w-4 text-red-400'/><p className='text-sm text-gray-600 truncate'>{listing.address}</p></div>
<p className='text-sm text-gray-700 line-clamp-3'>{listing.description}</p>
<p>${listing.offer?listing.discountPrice.toLocaleString('en-US'):listing.regularPrice.toLocaleString('en-US')}{listing.type==='rent'?'/month':""}</p>
<div className='flex gap-3'>
    <div className='flex gap-1'>
    <p>{listing.bedrooms}</p>
    <p>bedroom</p>
    </div>

    <div className='flex gap-1'>
    <p>{listing.bathrooms}</p>
    <p>bathroom</p>
    </div>
   
</div>
</div>
        
        </Link></div>
  )
}
