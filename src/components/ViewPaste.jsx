
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { addToPastes } from '../redux/pasteSlice';
import { updateToPastes } from '../redux/pasteSlice';
import { useSelector } from 'react-redux';

const ViewPaste = () => {

 const {id} = useParams();

 const allPastes = useSelector((state) => state.paste.pastes);

 const paste = allPastes.find((p) => p._id === id);

  return (
    <div>
     <div className='flex flex-row gap-7 place-content-between'>
    <input 
    className='p-1 rounded-2xl mt-2 w-[60%] pl-5'
    type="text" 
    style={{ border: "1px solid white", color: "white", backgroundColor: "black" }}
    placeholder='enter title here'
    value={paste.title}
    disabled
    onChange={(e) => setTitle(e.target.value)}
    />
  
    {/* <button  
    onClick={createPaste}
     style={{ border: "1px solid white", color: "white", backgroundColor: "black" }}
     className='p-2 rounded-2xl mt-2'
     >
     {
      pasteId ? "Update Paste" : "Create My Paste"
     }
    </button> */}
     
    </div>

    <div className='mt-8'>
    <textarea  
    className='rounded-2xl mt-4 min-w-[500px] p-4'
     style={{ border: "1px solid white", color: "white", backgroundColor: "black" }}
    value={paste.content}
    placeholder='enter content here'
    onChange={(e) => setValue(e.target.value)}
    rows={20}
    disabled
    >

    </textarea>
    </div>

   </div>
  )
}

export default ViewPaste
