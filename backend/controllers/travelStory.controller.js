import { fileURLToPath } from "url"
import TravelStory from "../models/travelStory.model.js"
import { errorHandler } from "../utils/error.js"
import path from "path"
import fs from "fs"
import cloudinary from "../cloudinary.js"

export const addTravelStory = async(req,res,next)=>{
    const {title,story,visitedLocation,imageUrl,visitedDate}=req.body

    const userId=req.user.id

    // validate required field
    if(!title || !story || !visitedLocation ||!imageUrl || !visitedDate )
    {
        return next(errorHandler(400, " All fields are required"))
    }
    // convert visited date from milisecond to date object
    const parsedVisitedDate =new Date(parseInt(visitedDate))

    try{
        const travelStory=new TravelStory({
            title,
            story,
            visitedLocation,
            userId,
            imageUrl,
            visitedDate: parsedVisitedDate,
        })
        await travelStory.save()
        res.status(201).json({
            story: travelStory,
            message: "Your story is added successfully",
        })
    }
    catch(error){
        next(error)
    }
}

export const getAllTravelStory =async(req,res,next)=>{
    const userId= req.user.id
    try{
        const travelStories = await TravelStory.find({userId: userId}).sort({
            isFavourite: -1
        })
        res.status(200).json({stories: travelStories })
    }
    catch(error){
    next(error)}
}

export const imageUpload = async(req,res,next) =>  {
  try {
    if (!req.file) {
      return next(errorHandler(400, "No image uploaded"));
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "travel_stories",
      },
      (error, result) => {
        if (error) return next(errorHandler(500, "Upload failed"));
        res.status(201).json({ imageUrl: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
}

const __filename = fileURLToPath(import.meta.url)
const __dirname =path.dirname(__filename)
const rootDir = path.join(__dirname, "..")

export const deleteImage = async (req, res, next) => {
  const { imageUrl } = req.query;

  if (!imageUrl) {
    return next(errorHandler(400, "imageUrl parameter is required"));
  }

  try {
    // Extract Cloudinary public_id
    const publicIdMatch = imageUrl.match(/travel_stories\/([^/.]+)/);
    if (!publicIdMatch) {
      return next(errorHandler(400, "Invalid image URL format"));
    }

    const publicId = `travel_stories/${publicIdMatch[1]}`;

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return next(errorHandler(500, "Failed to delete image from Cloudinary"));
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    next(error);
  }
};


export const editTravelStory = async(req,res,next)=>{
    const {id} = req.params
    const {title,story,visitedLocation,imageUrl,visitedDate}=req.body
    const userId=req.user.id

    //validate required field
    if(!title || !story || !visitedLocation || !visitedDate){
        return next(errorHandler(400, "All fields are required"))
    }

const parsedVisitedDate =new Date(parseInt(visitedDate))

try{
    const travelStory = await TravelStory.findOne({_id: id, userId:userId})

    if(!travelStory){
        next(errorHandler(404, "Travel Story not found!"))
    }
    const placeholderImageUrl= `https://travel-diary-1.vercel.app/assets/placeholderimg.png`

    travelStory.title = title
    travelStory.story =story
    travelStory.visitedLocation=visitedLocation
    travelStory.imageUrl=imageUrl || placeholderImageUrl
    travelStory.visitedDate= parsedVisitedDate

    await travelStory.save()

    res.status(200).json({
        story: travelStory,
        message: "Travel story added successfully!",
    })
}catch(error)
{
    next(error)
}
}

export const deleteTravelStory =async(req,res,next) =>{
    const { id } =req.params
    const userId= req.user.id 

    try{

      const travelStory = await TravelStory.findOne({_id: id, userId:userId})  

      if(!travelStory){
        next(errorHandler(404, "Travel Story not found!"))
    }
    //delete travel story from database
    await travelStory.deleteOne({_id: id, userId: userId })

    //chec if a image is not placeholder before deleting
    const placeholderImageUrl= `https://travel-diary-1.vercel.app/assets/placeholderimg.png`

    //extract the filename from the imageurl

    const imageUrl =travelStory.imageUrl

        if (imageUrl && imageUrl !== placeholderImageUrl) {
        const publicIdMatch = imageUrl.match(/travel_stories\/([^/.]+)/);
        if (publicIdMatch) {
            const publicId = `travel_stories/${publicIdMatch[1]}`;
            await cloudinary.uploader.destroy(publicId);
        }
    }

        
       

    res.status(200).json({message : "Travel story deleted successfully! "})
    }catch(error){
        next(error)
    }
}

export const updateIsFavourite =async(req,res,next)=>{
    const {id}=req.params 
    const {isFavourite} =req.body
    const userId = req.user.id
    try{
        const travelStory=await TravelStory.findOne({_id: id, userId:userId})
        if(!travelStory){
            return next(errorHandler(404, "Travel story not found!"))
        }
        travelStory.isFavourite =isFavourite
        await travelStory.save()
        res.status(200).json({story: travelStory, message: "Updated successfully! "})
    }catch(error)
    {
        next(error)
    }
}

export const searchTravelStory=async(req,res,next)=>{
    const {query}=req.query
    const userId = req.user.id

    if(!query)
    {
        return next(errorHandler(404,"Query is required!"))
    }
    try{
        const searchResults=await TravelStory.find({
            userId: userId,
            $or: [
                {
                    title: {$regex: query, $options: "i"}
                },
                {
                    story: {$regex: query, $options: "i"}
                },
                {
                    visitedLocation: {$regex: query, $options: "i"}
                }
            ]
        }).sort({isFavourite: -1})

        res.status(200).json({
            stories: searchResults,
        })
    }catch(error)
    {
        next(error)
    }
}

export const filterTravelStories = async(req,res,next) => {
    const {startDate, endDate} = req.query
    const userId = req.user.id
    try{
        const start=new Date(parseInt(startDate))
        const end=new Date(parseInt(endDate))

        const filteredStories =await TravelStory.find({
            userId:userId,
            visitedDate: {
                $gte: start, $lte: end
            },
        }).sort({isFavourite: -1})

        res.status(200).json({stories: filteredStories})
    }
    catch(error)
    {
        next(error)
    }
}
