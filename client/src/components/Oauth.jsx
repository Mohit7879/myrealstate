import React from 'react'

export default function Oauth() {
    handleGoogleClick=async (e)=>{
        try {
            
        } catch (error) {
            console.log("could not sign in with google",error);
        }

    }
  return (
      <>
      <button onClick={handleGoogleClick} type='button' className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"> continue with google </button>
      </>
  )
}

