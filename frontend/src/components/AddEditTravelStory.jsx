import React, { useState } from 'react'
import { IoIosAdd, IoIosClose } from "react-icons/io"
import { GrUpdate } from "react-icons/gr"
import { MdDelete } from "react-icons/md"
import DateSelector from "./DateSelector"
import ImageSelector from './ImageSelector'
import TagInput from './TagInput'
import axiosInstance from '../utils/axiosInstance'
import moment from 'moment'
import { toast } from 'react-toastify'

import uploadImage from '../utils/uploadImage'

const AddEditTravelStory = ({storyInfo, type, onClose, getAllTravelStories}) => {
const [visitedDate,setVisitedDate]=useState(storyInfo?.visitedDate || null)
const [title,setTitle]=useState(storyInfo?.title || "")
const[storyImg,setStoryImg]=useState(storyInfo?.imageUrl || null)
const [story,setStory]=useState(storyInfo?.story || "")
const[visitedLocation,setVisitedLocation]=useState(storyInfo?.visitedLocation || [])
const [error,setError]=useState("")
const addNewTravelStory=async()=>{
    try{
        let imageUrl=""
        if(storyImg){
            const imgUploadRes=await uploadImage(storyImg)
            imageUrl=imgUploadRes.imageUrl || ""
        }
        const response=await axiosInstance.post("/travel-story/add",{
            title,
            story,
            imageUrl: imageUrl ||"",
            visitedLocation,
            visitedDate: visitedDate?moment(visitedDate).valueOf():moment().valueOf(),
        })
        if(response.data && response.data.story){
            toast.success("Story added successfully")
            getAllTravelStories()
            onClose()
        }
    }
    catch(error){
        console.log(error)
    }
}
const updateTravelStory=async()=>{
    const storyId=storyInfo._id
    try{
        let imageUrl=""
        let postData={
            title:title,
            story:story,
            imageUrl:storyInfo.imageUrl || "",
            visitedLocation:visitedLocation,
            visitedDate:visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
        }
        if(typeof storyImg === "object"){
            const imageUploadResponse =await uploadImage(storyImg)
            imageUrl=imageUploadResponse.imageUrl || ""

            postData={
                ...postData,
                imageUrl: imageUrl,

            }
        }
        const response= await axiosInstance.post("/travel-story/edit-story/"+storyId,postData)
        if(response.data && response.data.story)
        {
            toast.success("Story updated successfully!")
            getAllTravelStories()

            onClose()
        }
    }catch(error)
    {
        if(error.response && error.response.data && error.response.data.message){
            setError(error.response.data.message)
        }
        else{
            setError("Something went wrong! Please try again!")
        }
    }
}
const handleAddOrUpdatClick=()=>{
    if(!title){
        setError("Please enter a title")
        return
    }
    if(!story){
        setError("Please enter a story")
        return
    }
    setError("")
    if(type==="edit"){
        updateTravelStory()
    }
    else{
        addNewTravelStory()
    }
}
const handleDeleteStoryImage=async ()=>{
    const deleteImageResponse = await axiosInstance.delete("/travel-story/delete-image", {
        params: {
            imageUrl: storyInfo.imageUrl,
        }
    })
    if(deleteImageResponse.data){
        const storyId=storyInfo._id
        const postData={
            title,story,visitedLocation,
            visitedDate:moment().valueOf(),
            imageUrl:"",
        }
        const response=await axiosInstance.post("/travel-story/edit-story/"+storyId, postData)
        if(response.data){
            toast.success("Story image deleted successfully!")
            setStoryImg(null)
            getAllTravelStories()
        }
        
    }
}
  return (
    <div className="relative">
    <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
            {type === "add" ? "Add story" : "Update story"}
        </h5>
     <div>
        <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-1-lg">
           
           {type==="add" ? (<button className="btn-small" onClick={handleAddOrUpdatClick}>
            <IoIosAdd />ADD STORY
           </button>) : (
            <>
            <button className="btn-small" onClick={handleAddOrUpdatClick}>
                <GrUpdate className="text-lg"/>UPDATE STORY
            </button>
            <button className="btn-small btn-delete ">
                <MdDelete className="text-lg"/>DELETE STORY
            </button>
            </>
           )}
           <button className="cursor-pointer  hover:border hover:border-slate-500 hover:rounded-lg" onClick={onClose}>
            <IoIosClose className="text-xl text-slate-400" />
           </button>
        </div>
        {error && (
            <p className="text-red-500 text-xs pt-2 text-right">{error}</p>
        )}
      </div>
     </div>
     <div>
        <div className="flex flex-1 flex-col gap-2 pt-4">
            <label className="input-label">TITLE</label>
            <input type="text" className="text-xl text-slate-900 outline-none" placeholder="I still remember...."
            value={title} onChange={(e)=>setTitle(e.target.value)} />
            <div className="my-3">
                <DateSelector date={visitedDate} setDate={setVisitedDate}/>
            </div>
            <ImageSelector image={storyImg} setImage={setStoryImg} 
            handleDeleteImage={handleDeleteStoryImage}/>
            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">STORY</label>
                <textarea type="text" className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded-sm" placeholder="Enter the story here" rows={10} value={story} 
                onChange={(e)=>setStory(e.target.value)} />
            </div>
            <div className="pt-3">
                <label className="input-label">PLACES VISITED</label>
                <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
            </div>
        </div>
     </div>
    </div>
  )
}

export default AddEditTravelStory
