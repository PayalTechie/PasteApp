import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { addToPastes } from '../redux/pasteSlice';
import { updateToPastes } from '../redux/pasteSlice';
import { useSelector } from 'react-redux';
import { Copy } from "lucide-react";
const Home = () => {
 const [title,setTitle] = useState("");
 const [value,setValue] = useState('');
 const [searchParams,setSearchParams] = useSearchParams();
 const pasteId = searchParams.get("pasteId");
 const dispatch = useDispatch();
 const allPastes = useSelector((state) => state.paste.pastes);

 useEffect(() => {
   if(pasteId){
    const paste = allPastes.find((p) => p._id === pasteId);
    setTitle(paste.title);
    setValue(paste.content);
   }
 }, [pasteId])
 
  function createPaste(){
    const paste = {
      title: title,
      content: value,
      _id: pasteId || 
      Date.now().toString(36),
      createdAt:new Date().toISOString(),

    }

    if(pasteId){
      //paste ko update krna h 
      dispatch(updateToPastes(paste));

    }
    else{
     //naya paste add krna h 
     dispatch(addToPastes(paste));
    }
    //after creation or updation clear 
    setTitle('');
    setValue('');
    setSearchParams({});
  }
  return (
   <div>
     <div className='flex flex-row gap-7 place-content-between'>
    <input 
   className=" mt-7 w-screen h-10 p-3 border border-gray-600 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="text" 
    style={{ border: "1px solid white", color: "white", backgroundColor: "black" }}
    placeholder='Title'
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    />
  
    <button  
    onClick={createPaste}
    className=" mt-7 w-1/3  h-10 p-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
     style={{ border: "1px solid white", color: "white", backgroundColor: "blue" }}
     
     >
     {
      pasteId ? "Update Paste" : "Create My Paste"
     }
    </button>
     
    </div>

    <div className="relative mt-8">
  <textarea
    className="w-full h-full p-4 border border-gray-600 rounded-lg bg-gray-900 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    style={{ border: "1px solid white", color: "white", backgroundColor: "black" }}
    value={value}
    placeholder="Type here..."
    onChange={(e) => setValue(e.target.value)}
    rows={20}
  ></textarea>

  {/* Copy Button */}
  <button
 
    onClick={() => {
      navigator.clipboard.writeText(value);
    }}
    className=" m-2 p-2 absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-500 text-white rounded"
  >
    <Copy size={20} />
  </button>
</div>


   </div>
  )
}

export default Home
