import React from 'react'
import { IoMdClose, IoMdSearch } from 'react-icons/io'

const SearchBar = ({value,onChange,handleSearch,onClearSearch}) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input type="text" placeholder='Search here' className="w-full text-xs bg-transparent py-[11px] outline-none" 
      value={value} onChange={onChange}/>
      {value && (
        <IoMdClose className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3' onClick={onClearSearch}/>
      )}
      <IoMdSearch className="text-slate-400 cursor-pointer hover:text-black text-lg" 
      onClick={handleSearch}/>
    </div>
  )
}

export default SearchBar
