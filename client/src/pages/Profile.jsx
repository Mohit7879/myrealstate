import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {getStorage,ref, uploadBytesResumable,getDownloadURL} from 'firebase/storage'

import { app } from "../firebase";

export default function Profile() {
  const {currentUser}=useSelector(state=>state.user);
  const fileRef=useRef(null);
  const [ file, setFile] = useState(undefined);
  const [formData, SetFormData]= useState({});
  
  useEffect(()=>{
    if(file){
      handleFileUpload()
    }
  },[file])
 
  const [progressper,setProgress]=useState(0);
  const handleFileUpload = () => {
    
      console.log(file);
      const storage=getStorage(app)
      const fileName= new Date().getTime()+file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,fileName);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log(progressper);
        },
        (error) => {
          console.error(error,"firebase error");
        },
        () => {
          // Upload complete
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            SetFormData({...formData,avatar:url})
            console.log( url)
          
            // You can use 'url' to display the uploaded image or store it in a database.
  })
})
  }
      
  
  
  return (
    
    <div className="p-5 max-w-lg mx-auto">
      <form className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"></input>
        <img onClick={()=>fileRef.current.click()} className="self-center rounded-full w-24 h-24 " src={formData.avatar||currentUser.avatar} alt="profile"/>
        <input className="border p-3 rounded-lg" type="text" placeholder="username" id="username"></input>
        <input  className="border p-3 rounded-lg" type="text" placeholder="username" id="username"></input>
        <input  className="border p-3 rounded-lg" type="text" placeholder="username" id="username"></input>
        <button className="bg-slate-700 text-white rounded-lg p-2 hover:bg-slate-600">Update</button>
      </form>
      <div className="flex justify-between p-3">
      <span className="text-red-700 cursor-pointer">Delete account</span>
    <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  
    
  )
}