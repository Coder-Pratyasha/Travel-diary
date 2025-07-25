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
import EmptyCard from '../../components/EmptyCard'
import { DayPicker } from 'react-day-picker'
import moment from 'moment'
import FilterInfoTitle from '../../components/FilterInfoTitle'
import { getEmptyCardMessage } from '../../utils/helper'

const Home = () => {
  const [allStories,setAllStories]=useState([])

  const [searchQuery,setSearchQuery]=useState("")

  const [filterType,setFilterType]=useState("")

  const [dateRange,setDateRange]=useState({from:null,to:null})
  
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
const handleEdit=async (data)=>{
  setOpenAddEditModal({isShown: true, type:"edit", data:data})
}

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

  const deleteTravelStory=async(data)=>{
    const storyId=data._id
    try{
      const response=await axiosInstance.delete("/travel-story/delete-story/"+storyId)
      if(response.data && !response.data.error)
      {
        toast.success("Story deleted successfully!")
        setOpenViewModel((prevState)=>({...prevState,isShown: false}))
        getAllTravelStories()
      }
    }
    catch(error)
    {
      console.log("Something went wrong! Please try again!")
    }
  }

  const onSearchStory=async(query)=>{
    try{
      const response=await axiosInstance.get("/travel-story/search",{
        params:{
          query:query,

        },
      })
      if(response.data && response.data.stories)
      {
        setFilterType("search")
        setAllStories(response.data.stories)
      }
    }catch(error)
    {
      console.log("Something went wrong! Please try again!")
    }
  }

  const handleClearSearch=()=>{
    setFilterType("")
    getAllTravelStories()
  }

  const filterStoriesByDate=async(day)=>{
    try{
      const startDate=day.from? moment(day.from).valueOf():null
      const endDate=day.to? moment(day.to).valueOf():null
      if(startDate && endDate){
        const response=await axiosInstance.get("/travel-story/filter", {
          params: {startDate,endDate},
        },
      )
        if(response.data && response.data.stories)
        {
          setFilterType("date")
          setAllStories(response.data.stories)
        }
      }
    }catch(error)
    {
      console.log("Something went wrong! Please try again.")
    }
  }

  const handleDayClick=(day)=>{
    setDateRange(day)
    filterStoriesByDate(day)
  }

  const resetFilter=()=>{
    setDateRange({from: null,to:null})
    setFilterType("")
    getAllTravelStories()
  }

  useEffect(()=>{
    getAllTravelStories()
    return ()=>{}
  },[])
  return (
    <>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearchNote={onSearchStory} handleClearSearch={handleClearSearch} />
      <div className="container mx-auto py-10">
        <FilterInfoTitle filterType={filterType} filterDate={dateRange} 
        onClear={()=>{
          resetFilter()
        }} />
         <div className="flex flex-col-reverse md:flex-row gap-7">
          <div className="flex-1">
            { allStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-2">
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
              <EmptyCard imgSrc={"https://images.pexels.com/photos/8490066/pexels-photo-8490066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
              message={getEmptyCardMessage(filterType)}
              setOpenAddEditModal={()=>setOpenAddEditModal({
                isShown: true,
                type: "add",
                data: null,
              })}
              />
            )}
          </div>
            <div className="md:w-[320px] w-full mb-6 md:mb-0 md:p-2">
              <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg">
              <div className='p-3'>
                <DayPicker  captionLayout="dropdown" mode="range" selected={dateRange}
                onSelect={handleDayClick}
                 pagedNavigation />
              </div>
              </div>
            </div>
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
      className="w-full h-full md:w-[40%] md:h-[80vh] bg-white rounded-none md:rounded-lg mx-auto md:mt-14 p-5 overflow-y-scroll scrollbar z-50"
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
        className="w-full h-full md:w-[40%] md:h-[80vh] bg-white rounded-none md:rounded-lg mx-auto md:mt-14 p-5 overflow-y-scroll scrollbar z-50"
        >
          <ViewTravelStory  
          storyInfo={openViewModal.data || null}
          onClose={()=>{
            setOpenViewModel((prevState)=>({...prevState,isShown: false}))
          }}
          onEditClick={()=>{
            setOpenViewModel((prevState)=>({...prevState,isShown:false}))
            handleEdit(openViewModal.data || null)
          }}
          onDeleteClick={()=>{
            deleteTravelStory(openViewModal.data || null)
          }} 
          />
      </Modal>

      <button className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-600 hover:bg-cyan-800 transform hover:scale-125 transition-transform  fixed right-10 bottom-10" 
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
