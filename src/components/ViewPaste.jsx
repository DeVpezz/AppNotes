import React,{useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
const ViewPaste = () => {

  const {id}=useParams();
      const allPaste = useSelector((state) => state.paste.pastes);
  const paste=allPaste.filter((p)=>p._id===id)[0];
  console.log("final Paste:",paste);
  return (
    <div>
        <div className="flex flex-row gap-10">
          <input className="p-1 rounded-2xl mt-2  w-[60%] pl-4 bg-black"
       type="text"
      placeholder="enter the title"
      value={paste.title}
      disabled
      onChange={(e)=>setTitle(e.target.value)}
      />
       {/* <button 
       onClick={createPaste}
       className="p-2 rounded-2xl mt-2 ">
        {
            pasteId ? "Update my paste":"Create my paste"
        }
       </button> */}
    </div>
    <div>
        <textarea
        className="rounded-2xl mt-1 min-w-[500px] p-4 bg-black"
        value={paste.content}
        placeholder="enter content here"
        disabled
        onChange={(e)=>setValue(e.target.value)}
        rows={20}
        
        />
    </div>
    </div>
   
  )
}

export default ViewPaste
