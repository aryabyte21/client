import React, { Fragment, useContext, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { sliderImages } from "../../admin/dashboardAdmin/Action";
import { logout } from "./Action";
import { DashboardUserContext } from "./Layout";
import profile from "./images/profile.jpg";
import axios from "axios";

import "./userImage.css";
const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;
const Headers = () => {
  return {
    headers: {
      token: `Bearer ${BearerToken()}`,
    },
  };
};
const apiURL = process.env.REACT_APP_API_URL;
const Sidebar = (props) => {
  const { data } = useContext(DashboardUserContext);
  const history = useHistory();
  const location = useLocation();
  const submitHandler = (e) =>{
    
    
    console.log(e);
  }
  // Profile image upload
  const uploadedImage = React.useRef({profile});
  const imageUploader = React.useRef({profile});
  const handleImageUpload = e => {
    const url = `${apiURL}/api/user/add-user-photo`
    const bodyFormData = new FormData();
    const [file] = e.target.files;
    if (file) {
      bodyFormData.append('images', file);
      axios.post(url, bodyFormData, {headers: {
      token: `Bearer ${BearerToken()}`,
      'content-type': 'multipart/form-data'
    }});
      // const reader = new FileReader();
      // const { current } = uploadedImage;
      // current.file = file;
      // reader.onload = e => {
      //   current.src = e.target.result;
      // };
      // reader.readAsDataURL(file);
    } 
  };


  return (
    <Fragment>
      <div className="flex flex-col w-full space-y-4 md:w-3/12 font-medium">
        <div
          style={{ background: "#303031" }}
          className="flex items-center space-x-2 rounded shadow p-2 text-gray-100"
        >
        

          {/* <svg
            className="cursor-pointer w-16 h-16 text-gray-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg> */}
          
            {/* <div className="flex flex-col"> */}
            {/* <img src={profile} className="rounded-full h-24 w-24" /> */}


            {/* Profile image  */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={imageUploader}
              style={{
                display: "none"
              }}
            />
            {/* <div
              style={{
                height: "80px",
                width: "80px",
                border: "1px dashed black",
                borderRadius: "50%"
              }}
               onClick={() => imageUploader.current.click()}
            >
              <img
                ref={uploadedImage}
                style={{
                  // width: "100%",
                  // height: "100%",
                  width: "80px",
                  height: "80px",
                  position: "absolute",
                  borderRadius: "50%"
                }}
                href={data.userDetails ? `${apiURL}/api/photo/get-photo/${data.userDetails.userImage}` : ""}
                onError={(e) => (e.currentTarget.sec = {profile})}
                alt="userImage"
              />
            </div> */}
            <div className="userImage">
            <input type="file" name="images" id="images" onChange={handleImageUpload}/>
              <img src={data.userDetails ? `${apiURL}/api/photo/get-photo/${data.userDetails.userImage}` : ""} alt="userImage" />
            </div>
              {/* <span className="text-sm">Hello,</span> */}
              <span className="text-3xl pl-2">

                {data.userDetails ? data.userDetails.name : ""}
              </span>
            {/* </div> */}
          
        </div>
        <div className="shadow hidden md:block w-full flex flex-col">
          <div
            onClick={(e) => history.push("/user/orders")}
            className={`${
              location.pathname === "/user/orders"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            }  px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            My Orders
          </div>
          <hr />
          <div
            onClick={(e) => history.push("/user/products")}
            className={`${
              location.pathname === "/user/orders"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            }  px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            Add Product
          </div>
          <hr />

          <div
            onClick={(e) => history.push("/user/profile")}
            className={`${
              location.pathname === "/user/profile"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            }  px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            My Accounts
          </div>
          <hr />
          
          <div
            onClick={(e) => history.push("/wish-list")}
            className={` px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            My Wishlist
          </div>
          <hr />
          <div
            onClick={(e) => history.push("/user/setting")}
            className={`${
              location.pathname === "/user/setting"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            }  px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            Setting
          </div>
          <hr />
          <div
            onClick={(e) => logout()}
            className={`${
              location.pathname === "/admin/dashboard/categories"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            }  px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            Logout
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
