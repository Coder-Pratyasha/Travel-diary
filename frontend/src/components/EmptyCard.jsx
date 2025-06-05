import React from 'react'

const EmptyCard = ({imgSrc,message,setOpenAddEditModel}) => {
  return (
    <div className="flex items-center justify-center h-[50vh] w-full">
    <div className="flex flex-col items-center mt-auto ml-auto p-10 bg-gray-100 rounded-lg shadow-lg border border-gray-300 max-w-sm">
      
        <img src={imgSrc} alt="image" className="w-50 h-50 object-contain" />
      
      <p className='text-lg font-semibold text-gray-800 text-center mt-6'>{message}</p>

    </div>
    </div>
  )
}

export default EmptyCard
