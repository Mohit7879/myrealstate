import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {getStorage,ref, uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { app } from "../firebase";
import { updateUserStart,updateUserSuccess,updateUserFailure,deleteUserSuccess,deleteUserFailure , signoutSuccess,signoutFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

export default function Profile() {
  const {currentUser,loading , error}=useSelector(state=>state.user);
  console.log(currentUser);
  const fileRef=useRef(null);
  const [ file, setFile] = useState(undefined);
  const [formData, SetFormData]= useState({});
  const Navigate=useNavigate();

  const dispatch=useDispatch();

 
  
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
            console.log(formData);
            console.log( url)
          
            // You can use 'url' to display the uploaded image or store it in a database.
  })
}
)
  }

  const handleChange=(e)=>{
    console.log(formData);
    SetFormData({...formData,[e.target.id]:e.target.value})
   
  }

  const handleupdateUser=async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
  
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
  
        
        body:JSON.stringify(formData),
  
      });
      const data = await res.json()
      console.log(data);
      
      console.log(data.message);
      if(data.success===false){
       dispatch(updateUserFailure(data.message))
        return;
      }

     dispatch(updateUserSuccess(data))
     Navigate('/')
   
      
      
     
    } catch (error) {

      dispatch(updateUserFailure(error.message))
      
    }

  }


  const handleDeleteUser= async (e)=>{

    try{
     
  
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
        
      });
      const data = await res.json()
      console.log(data);
      
      console.log(data.message);
      if(data.success===false){
       dispatch(deleteUserFailure(data.message))
        return;
      }

     dispatch(deleteUserSuccess(data))
     Navigate('/signup')
   
      
      
     
    } catch (error) {

      dispatch(deleteUserFailure(error.message))
      
    }

  }

  const handleSignOut= async (e)=>{
    try {
          console.log(('inside signout'));
        const res= await fetch(`/api/auth/signout`);
        const data= await res.json();
        console.log(data);

        if(data.success===false){
          dispatch(signoutFailure(data.message))
        }

        dispatch(signoutSuccess(data));
       

      
    } catch (error) {
       dispatch(signoutFailure(error.message))
    }
  }

  
    return (
    
    <div className="p-5 max-w-lg mx-auto">
      <form  onSubmit={handleupdateUser} className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"></input>
        <img onClick={()=>fileRef.current.click()} className="self-center rounded-full w-24 h-24 " src={formData.avatar||currentUser.avatar} alt="profile"/>
        <input onChange={handleChange} defaultValue={currentUser.username} className="border p-3 rounded-lg" type="text" placeholder="username" id="username"></input>
        <input onChange={handleChange} defaultValue={currentUser.email} className="border p-3 rounded-lg" type="text" placeholder="username" id="email"></input>
        <input onChange={handleChange} defaultValue={currentUser.password} className="border p-3 rounded-lg" type="text" placeholder="password" id="password"></input>
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-2 hover:bg-slate-600">{loading?'loading...':'Update'}</button>
      </form>
      <div className="flex justify-between p-3">
      <button className="text-red-700 cursor-pointer" onClick={handleDeleteUser} >Delete User</button>
    <button onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</button>
      </div>
      { error&&<h1 className="text-red-500  "> ERROR <p1>{error}</p1></h1>}

      
    </div>
  
    
  )
}