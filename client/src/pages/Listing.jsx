import React from 'react'

export default function Listing() {
  return (
   <main className='p-4  max-w-4xl mx-auto '>
    <h1 className='font-semibold text-center text-3xl my-7'>Create Listing</h1>
   <form className='flex flex-col sm:flex-row gap-4 '>
    <div className=' flex flex-col flex-1 gap-3'>
        <input type='text' placeholder='Name' id='name' className='border p-3 rounded-lg' required></input>
        <textarea type='text' placeholder='Description' id='description' className='border p-3 rounded-lg'></textarea>
        <input type='text' placeholder='Address' id='address' className='border p-3 rounded-lg'></input>

        <div className='flex gap-3 flex-wrap'>
            <div className='flex gap-3 '> 
                <input type='checkbox' id='sale' className='w-5 gap-x-4'></input>
                <span>Sell</span>
            </div>

            <div className='flex gap-3 '> 
                <input type='checkbox' id='rent' className='w-5 gap-x-4'></input>
                <span>Rent</span>
            </div>
            <div className='flex gap-3 '> 
                <input type='checkbox' id='parking' className='w-5 gap-x-4'></input>
                <span>Parking</span>
            </div>

            <div className='flex gap-3 '> 
                <input type='checkbox' id='furnished' className='w-5 gap-x-4'></input>
                <span>Furnished</span>
            </div>

            <div className='flex gap-3 '> 
                <input type='checkbox' id='offer' className='w-5 gap-x-4'></input>
                <span>Offer</span>
            </div>
        </div>

        <div className='flex flex-wrap gap-5'>
        <div className='flex items-center gap-3'>
            <input type="number"  id='bedrooms' min="1" max="10" className='border border-gray-300 rounded-lg p-3' required/>
            <p>Beds</p>
        </div>
        <div className='flex items-center gap-3'>
            <input type="number"  id='bathrooms' min="1" max="10" className='border border-gray-300 rounded-lg p-3' required/>
            <p>Bathrooms</p>
        </div>
        <div className='flex items-center gap-3'>
            <input type="number"  id='regularPrice' min="1" max="10" className='border border-gray-300 rounded-lg p-3' required/>
          
            <div  className='flex flex-col items-center'>
            <p>Regular Price</p>
            <span className='text-xs'>(Rs/month)</span>
            </div>
        </div>
        <div className='flex items-center gap-3'>
            <input type="number"  id='discountedPrice' min="1" max="10" className='border border-gray-300 rounded-lg p-3' required/>
          
            <div className='flex flex-col items-center'>
            <p>Discounted Price</p>
            <span className='text-xs'>(Rs/month)</span>
            </div>
        </div>
        </div>
       
    </div>

         {/* right side  */}
  <div className=' flex flex-col flex-1 ml-4 gap-5'>
    <div className=' my-3'>
        
        <p className='font-semibold flex flex-row'>Images:
        <span className='font-normal text-gray-600 '>The first image will be cover (max 6) </span></p>
    </div>

    <div className='flex gap-2'>
        <input type='file' id='images' accept='image/*' className='border  border-gray-300 rounded p-3' multiple></input>
        <button className=' p-1 border border-gray-300 rounded hover:shadow-lg text-green-700'>Upload</button>
    </div>
   
       <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-75'> Create listing </button>
       </div>
   </form>
   
   </main>
  )
}
