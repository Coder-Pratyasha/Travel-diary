import React, {useState} from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa"

const PasswordInput = ({value, onChange, placeholder}) => {
    const [isShowPassword, setIsShowPassword]=useState(false)
    const toggleShowPassword=()=>{
        setIsShowPassword(!isShowPassword)
    }
  return (
    <div className="flex items-center bg-cyan-600/5 px-5 rounded-sm mb-3">
      <input 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder || "Enter your password"} 
      className="w-full text-sm bg-transparent py-2 mr-3 rounded-sm outline-hidden" 
      type={isShowPassword ? "text":"password"} 
      />
      {isShowPassword ? (
        <FaEye size={20} 
        className="text-slate-500 cursor-pointer" 
        onClick={()=>toggleShowPassword()} 
        />):
      (<FaEyeSlash 
      size={20} 
      className="text-slate-500 cursor-pointer"
       onClick={()=>toggleShowPassword()}
       />
       )}
    </div>
  )
}

export default PasswordInput
