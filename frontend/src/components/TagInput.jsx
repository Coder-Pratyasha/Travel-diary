import React, { useState } from 'react'
import { IoIosAdd } from 'react-icons/io'
import { FaLocationDot } from "react-icons/fa6"
import { IoCloseSharp } from "react-icons/io5"

const TagInput = ({tags,setTags}) => {
    const [inputValue,setInputValue]=useState([])
    const addNewTag=()=>{
        if(inputValue.trim() !== ""){
            setTags([...tags, inputValue.trim()])
            setInputValue("")
        }
    }
    const handleInputChange=(e)=>{
        setInputValue(e.target.value)
    }
    const handleKeyDown=(e)=>{
        if(e.key === "Enter"){
            addNewTag()
        }
    }
    const handleRemoveTag=(tagToRemove)=>{
        setTags(tags.filter((tag)=>tag !== tagToRemove))
    }
  return (
    <div>
    {
        tags.length > 0 && (
            <div className="flex items-center gap-4 mt-3">
                {tags.map((tags,index)=>(
                    <span key={index} className="flex items-center gap-2 text-sm text-cyan-600 bg-cyan-200/40 px-3 py-1 rounded-sm">
                        <FaLocationDot />{tags}
                        <button onClick={()=>handleRemoveTag(tags)} className="cursor-pointer  hover:border hover:border-slate-500 hover:rounded-lg">
                            <IoCloseSharp />
                        </button>
                    </span>
                ))}
            </div>
        )
    }
    <div className='flex items-center gap-4 mt-3'>
      <input type="text" value={inputValue} className='text-sm bg-transparent border border-slate-300 px-3 py-2 rounded-am outline-none' placeholde="Add location" onChange={handleInputChange} onKeyDown={handleKeyDown}/>
      <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-cyan-500 hover:bg-cyan-500" onClick={addNewTag}>
        <IoIosAdd className="text-2xl text-cyan-500 hover:text-white "/>
      </button>
    </div>
    </div>
  )
}

export default TagInput
