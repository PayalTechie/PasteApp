import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { removeFromPastes } from '../redux/pasteSlice';
import { toast } from 'sonner';
import { FaEye, FaEdit, FaTrash, FaCopy, FaShare, FaCalendarAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};
 
const Paste = () => {
  const [expandedPasteId, setExpandedPasteId] = useState(null);

  const pastes  = useSelector((state) => 
  state.paste.pastes);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
   dispatch(removeFromPastes(pasteId));
  }
  
  function handleShare(pasteId) {
    const shareableLink = `${window.location.origin}/pastes/${pasteId}`;
  
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        toast.success("Link copied to clipboard!"); // Success message
      })
      .catch(err => {
        toast.error("Failed to copy link!");
        console.error("Clipboard error: ", err);
      });
  }
  
  return (
    <div>
     <input 
     type="search" 
     className='p-2 rounded-2xl w-5xl mt-5 sticky top-0 bg-black z-10'
     style={{ border: "1px solid white", color: "white", backgroundColor: "black" }}
      placeholder='search here'
      onChange={(e) => setSearchTerm(e.target.value)}
     />

     <div className='flex flex-col gap-5 mt-5' >
     {
       filteredData.length > 0 && 
       filteredData.map(
        (paste) => {
          return (
            <div  key={paste._id} className='border relative p-5'>
              <div>
             
              </div>
              <div className="text-left">
  <div className="font-bold">{paste.title}</div>
  <div className={`text-gray-300 ${expandedPasteId === paste._id ? '' : 'line-clamp-2'}`}>
    {paste.content}
  </div>
  {expandedPasteId !== paste._id && (
    <button onClick={() => setExpandedPasteId(paste._id)} className="text-blue-500 text-sm">
      Read More
    </button>
  )}
</div>

           <div  className='absolute bottom-2 right-2 flex gap-3 text-gray-400 text-lg' >
          <Link to={`/?pasteId=${paste?._id}`}>
          <button className="p-1 text-gray-400 hover:text-white transition-all">
          <FaEdit/>
            </button>
            </Link>
            <Link to={`/pastes/${paste?._id}`}>
           <button className="p-1 text-gray-400 hover:text-white transition-all"> <FaEye/> </button>
            </Link>

            <button  className="p-1 text-gray-400 hover:text-white transition-all" onClick={() => handleDelete(paste?._id)}>
            <FaTrash />
            </button>
            <button  className="p-1 text-gray-400 hover:text-white transition-all"
            onClick={() => {navigator.clipboard.writeText(paste?.content)
              toast.success("copied to clipboard")
            }}
            >
             <FaCopy />
            </button>
            <button onClick={() => handleShare(paste._id)}
              className="p-1 text-gray-400 hover:text-white transition-all"
              >
            <FaShare />
            </button>
           </div>
           <div>
           <div className=" p-1 absolute top-2 right-2 flex items-center gap-2 text-gray-400 text-sm">
  <FaCalendarAlt />
  <span>{formatDate(paste.createdAt)}</span>
</div>

           </div>
            </div>
             
          )
        }
         
       )
     }
     </div>
    </div>
  )
}

export default Paste
