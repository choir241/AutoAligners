import {useRef, useEffect} from "react"
import api from "../../api/api"
import { Permission, Role } from "appwrite"

const ImageUpload = () => {

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  async function handleEmployeeInfo(image, thumbnail){
    try{
      const data = {
        image,
        thumbnail
      }
      await api.createDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_PROFILE_COLLECTION_ID, data, [Permission.read(Role.any())])
    }catch(err){
      console.error(err)
    }
  }

 useEffect(()=>{
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: "melt",
      uploadPreset: "wpwjg7hr"
    }, (error, result)=>{
      if(result.event === "success"){
        const image = result.info.secure_url
        const thumbnail = result.info.thumbnail_url
        handleEmployeeInfo(image, thumbnail)
      }
    })
  },[]);

  return (
    <button className="button" onClick={()=>widgetRef.current.open()}>
      Upload Image
    </button>
  );
};

export default ImageUpload;