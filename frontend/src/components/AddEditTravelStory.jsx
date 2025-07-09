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

const AddEditTravelStory = ({ storyInfo, type, onClose, getAllTravelStories }) => {
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || null)
  const [title, setTitle] = useState(storyInfo?.title || "")
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null)
  const [story, setStory] = useState(storyInfo?.story || "")
  const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || [])
  const [error, setError] = useState("")

  const addNewTravelStory = async () => {
    try {
      let imageUrl = ""
      if (storyImg) {
        const imgUploadRes = await uploadImage(storyImg)
        imageUrl = imgUploadRes.imageUrl || ""
      }
      const response = await axiosInstance.post("/travel-story/add", {
        title,
        story,
        imageUrl,
        visitedLocation,
        visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
      })
      if (response.data?.story) {
        toast.success("Story added successfully")
        getAllTravelStories()
        onClose()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateTravelStory = async () => {
    const storyId = storyInfo._id
    try {
      let imageUrl = storyInfo.imageUrl || ""
      if (typeof storyImg === "object") {
        const imageUploadResponse = await uploadImage(storyImg)
        imageUrl = imageUploadResponse.imageUrl || ""
      }
      const postData = {
        title,
        story,
        imageUrl,
        visitedLocation,
        visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
      }
      const response = await axiosInstance.post("/travel-story/edit-story/" + storyId, postData)
      if (response.data?.story) {
        toast.success("Story updated successfully!")
        getAllTravelStories()
        onClose()
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong! Please try again!")
    }
  }

  const handleAddOrUpdatClick = () => {
    if (!title) return setError("Please enter a title")
    if (!story) return setError("Please enter a story")
    setError("")
    type === "edit" ? updateTravelStory() : addNewTravelStory()
  }

  const handleDeleteStoryImage = async () => {
    const deleteImageResponse = await axiosInstance.delete("/travel-story/delete-image", {
      params: { imageUrl: storyInfo.imageUrl },
    })
    if (deleteImageResponse.data) {
      const storyId = storyInfo._id
      const postData = {
        title,
        story,
        visitedLocation,
        visitedDate: moment().valueOf(),
        imageUrl: "",
      }
      const response = await axiosInstance.post("/travel-story/edit-story/" + storyId, postData)
      if (response.data) {
        toast.success("Story image deleted successfully!")
        setStoryImg(null)
        getAllTravelStories()
      }
    }
  }

  return (
    <div className="relative space-y-6">
      <div className="flex items-center justify-between border-b pb-2">
        <h5 className="text-xl font-semibold text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>
        <div className="flex items-center gap-2">
          {type === "add" ? (
            <button className="btn-primary flex items-center gap-2" onClick={handleAddOrUpdatClick}>
              <IoIosAdd /> Add Story
            </button>
          ) : (
            <>
              <button className="btn-primary flex items-center gap-2" onClick={handleAddOrUpdatClick}>
                <GrUpdate /> Update
              </button>
             
            </>
          )}
          <button
            className="text-slate-400 hover:text-slate-600 border rounded-lg p-1"
            onClick={onClose}
          >
            <IoIosClose className="text-xl" />
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm text-right">{error}</p>}
      <div>
        <label className="text-xs text-slate-600 font-medium">Title</label>
        <input
          type="text"
          className="w-full p-2 mt-1 text-base border border-slate-300 rounded-md focus:outline-cyan-400"
          placeholder="I still remember..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <DateSelector date={visitedDate} setDate={setVisitedDate} />
      <ImageSelector image={storyImg} setImage={setStoryImg} handleDeleteImage={handleDeleteStoryImage} />
      <div>
        <label className="text-xs text-slate-600 font-medium">Story</label>
        <textarea
          rows={8}
          className="w-full mt-1 p-2 text-sm bg-slate-100 border border-slate-200 rounded-md focus:outline-cyan-400"
          placeholder="Write your travel story here..."
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
      </div>
      <div>
        <label className="text-xs text-slate-600 font-medium">Places Visited</label>
        <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
      </div>
    </div>
  )
}

export default AddEditTravelStory
