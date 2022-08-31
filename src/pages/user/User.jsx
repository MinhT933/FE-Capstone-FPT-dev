
import "./user.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import React from "react";



export default function User() {
  const [openPopup, setOpenPopup]= useState(false);
  
  let {userId}=useParams();
  const [user, setUser] = React.useState({});
  console.log(userId);
  useEffect(() => {
    
  }, [])
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle"></h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
        <div className="userShowTop">
            <img
              src={"https://lh3.googleusercontent.com/pw/AL9nZEW3KGj4QJKIEhFlgC5T4Pdwv2AuWVfEJ4qmomgsGIBi1k6mcibWxv3t1sZyu-Z36NzEa35K9s4InDovIYOeMqo6LYYXuvIiCJ-OH1Ilf4YFlj0iRIHDDLcJypkE08JqNqA4gSSPGEeWFd77MLxO_21Z=w447-h649-no?authuser=0"}
              alt=""
              className="userShowImg"
            />
          
          </div>
        </div>
        <div className="userUpdate">
          <div className="userShowBottom">
            <span className="userShowTitle">Thông tin</span>
            <div className="userShowInfo">
              <PermIdentityIcon className="userShowIcon" /> 
              <span className="userShowInfoTitle">Phạm Đan Quỳnh</span>
            </div>
            <div className="userShowInfo">
               <CalendarTodayIcon className="userShowIcon" /> 
              <span className="userShowInfoTitle">11/02/2000</span>
            </div>
            <span className="userShowTitle">Liên Hệ</span>
            <div className="userShowInfo">
               <PhoneAndroidIcon className="userShowIcon" /> 
              <span className="userShowInfoTitle">0369784558</span>
            </div>
            <div className="userShowInfo">
              <MailOutlineIcon className="userShowIcon" /> 
              <span className="userShowInfoTitle">abc@gmail.com</span>
            </div>
            <div className="userShowInfo">
               <LocationSearchingIcon className="userShowIcon" /> 
              <span className="userShowInfoTitle">852 Song Hành xa lộ Hà Nội Tp: Thủ Đức</span>
            </div>
        
          <button className="userAddButton" onClick={()=> setOpenPopup(true)}>Edit</button>
         
          </div>
          {/* <PopupEdit onpenPopup={openPopup}/> */}
        </div>
      </div>
    </div>
  );
}
