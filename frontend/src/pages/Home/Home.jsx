import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import axiosInstance from '../../utils/axiosInstance'
import TravelStoryCard from "../../components/TravelStoryCard"
import { data } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"

const Home = () => {
  const [allStories,setAllStories]=useState([])
  console.log(allStories)
  const getAllTravelStories=async()=>{
    try{
      const response=await axiosInstance.get("/travel-story/get-all")
      if(response.data && response.data.stories){
        setAllStories(response.data.stories)
      }
    }
    catch(error){
      console.log("Something went wrong. Please try again")
    }
  }
//Handle edit story
const handleEdit=async (data)=>{}

const handleViewStory=(data)=>{}

const updateIsFavourite=async (storyData)=>{
  const storyId=storyData._id
  try{
    const response=await axiosInstance.put("/travel-story/update-is-favourite/"+storyId,
      {
        isFavourite: !storyData.isFavourite
      }
    )
    if(response.data && response.data.story)
    {
      toast.success("Story updated successfully")
      getAllTravelStories()
    }
  }catch(error)
  {
    console.log("Something went wrong. Please try again")
  }
}

  useEffect(()=>{
    getAllTravelStories()
    return ()=>{}
  },[])
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
         <div className="flex gap-7">
          <div className="flex-1">
            { allStories.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allStories.map((item)=>{
                  return (
                  <TravelStoryCard 
                    key={item._id} 
                    imageUrl={item.imageUrl} 
                    title={item.title} 
                    story={item.story} 
                    date={item.visitedDate} 
                    location={item.visitedLocation}
                    isFavourite={item.isFavourite} 
                    onEdit={()=>handleEdit(item)}
                    onClick={()=> handleViewStory(item)}
                    onFavouriteClick={() => updateIsFavourite(item)} />)
                })}
              </div>
            ):(
              <div>Empty</div>
            )}
          </div>
            <div className="w-[320px]"></div>
         </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Home
