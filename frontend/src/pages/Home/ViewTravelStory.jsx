import React from 'react'
import { GrUpdate } from 'react-icons/gr'
import { IoIosClose } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { FaLocationDot } from "react-icons/fa6"
import moment from "moment"

const ViewTravelStory = ({storyInfo,onClose,onEditClick,onDeleteClick}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-end">
        <div>
            <div className="flex items-center gap-3 bg-cyan-50/50 p-2  rounded-l-lg">
            <button className="btn-small" onClick={onEditClick}>
                <GrUpdate className="text-lg"/> UPDATE STORY
            </button>
            <button className="btn-small btn-delete" onClick={onDeleteClick}>
                <MdDelete className="text-lg"/>DELETE STORY
            </button>
            <button className="cursor-pointer  hover:border hover:border-slate-500 hover:rounded-lg" onClick={onClose}>
                <IoIosClose className="text-xl text-slate-400" />
            </button>
            </div>
        </div>
      </div>
      <div>
        <div className="flex-1 flex flex-col gap-2 py-4">
            <h1 className="text-2xl text-slate-950">
                {storyInfo && storyInfo.title}
            </h1>
            <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500">
                    {storyInfo && moment(storyInfo.visitedDate).format("Do MMM YYYY")}
                </span>
                <div className='inline-flex items-center gap-2 text-cyan-600 bg-cyan-200/40 text-[13px] rounded-sm px-2 py-1'>
                <FaLocationDot className="text-sm"/>
                {storyInfo && storyInfo.visitedLocation.map((item,index)=>
                    storyInfo.visitedLocation.length === index+1 ? `${item}` : `${item},`
                )} </div>
            </div>
        </div>
        <img src={storyInfo && storyInfo.imageUrl} alt="storyImage"
        className="w-full h-[300px] object-cover rounded-lg" />

        <div className="mt-4">
            <p className="text-sm text-slate-700 loading-6 text-justify whitespace-pre-line">{storyInfo.story}</p>
        </div>
      </div>
    </div>
  )
}

export default ViewTravelStory
