import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import axiosInstance from '../../utils/axiosInstance'
import TravelStoryCard from "../../components/TravelStoryCard"
import { data } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify"
import { IoIosAdd } from "react-icons/io"
import Modal from "react-modal"
import AddEditTravelStory from '../../components/AddEditTravelStory'
import ViewTravelStory from './ViewTravelStory'

const Home = () => {
  const [allStories,setAllStories]=useState([])
  
  const [openAddEditModal,setOpenAddEditModal]=useState({
    isShown: false,
    type: "add",
    data: null,
  })

  const [openViewModal,setOpenViewModel]=useState({
    isShown:false,
    data:null,
  })

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

const handleViewStory=(data)=>{
  setOpenViewModel({isShown:true,
    data:data
  })
}

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

      <Modal 
      isOpen={openAddEditModal.isShown}
      onRequestClose={()=>{}}
      style={{
        overlay:{
          backgroundColor: "rgba(0,0,0,0.2)",
          zIndex:999,
        },
      }}
      appElement={document.getElementById("root")}
      className="w-[80px] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
      >
        <AddEditTravelStory 
        storyInfo={openAddEditModal.data}
        type={openAddEditModal.type}
        onClose={()=>{
          setOpenAddEditModal({isShown:false, type: "add", data: "null" })
        }}
        getAllTravelStories={getAllTravelStories} />
      </Modal>

      <Modal isOpen={openViewModal.isShown}
        onRequestClose={()=>{}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        appElement={document.getElementById("root")}
        className="w-[80px] md:w-[40%] h-[80vh] bg-white rounded-lg mx-auto mt-14 p-5 overflow-y-scroll scrollbar z-50"
        >
          <ViewTravelStory  
          storyInfo={openViewModal.data || null}
          onClose={()=>{
            setOpenViewModel((prevState)=>({...prevState,isShown: false}))
          }}
          onEditClick={()=>{}}
          onDeleteClick={()=>{}} 
          />
      </Modal>

      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-400 hover:bg-cyan-600 transform hover:scale-125 transition-transform  fixed right-10 bottom-10" 
      onClick={()=>{
        setOpenAddEditModal({isShown: true, type: "add", data:null })
      }}>
        <IoIosAdd className="text-[32px] text-white"/>
      </button>
      <ToastContainer />
    </>
  )
}

export default Home
