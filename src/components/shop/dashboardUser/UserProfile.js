import React, { Fragment, useContext, useState, useEffect } from "react";
import Layout from "./Layout";
import { DashboardUserContext } from "./Layout";
import { updatePersonalInformationAction } from "./Action";
import { useHistory, useLocation } from "react-router-dom";

const ProfileComponent = () => {
  const history = useHistory();

  const { data, dispatch } = useContext(DashboardUserContext);
  const userDetails = data.userDetails !== null ? data.userDetails : "";

  const [fData, setFdata] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    photo:"",
    success: false,
  });

  useEffect(() => {
    setFdata({
      ...fData,
      id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phoneNumber,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const handleSubmit = () => {
    updatePersonalInformationAction(dispatch, fData);
  };
  const uploadProfile = () => {
    
  }
  if (data.loading) {
    return (
      <div className="w-full md:w-9/12 flex items-center justify-center ">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="flex flex-col w-full mt-2 mb-32 md:my-0 md:w-9/12 md:px-8">
        <div className="shadow-lg border">
          <div className="py-1 px-4 text-lg font-semibold">
            Personal Information
          </div>
          <hr className="my-2"/>
          <div className="pb-4 px-4 md:px-8 lg:px-16 flex flex-col space-y-4">
            {fData.success ? (
              <div className="bg-green-200 px-4 py-2 rounded">
                {fData.success}
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col space-y-2">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => setFdata({ ...fData, name: e.target.value })}
                value={fData.name}
                type="text"
                id="name"
                className="border px-4 py-2 w-full focus:outline-none"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email">Email</label>
              <input
                //value={fData.email}
                //readOnly
                placeholder="College email id"
                type="email"
                id="email"
                className="cursor-not-allowed border px-4 py-2 w-full focus:outline-none focus:cursor-not-allowed"
              />
              {/* <span className="text-xs text-gray-500">
                You can't change your email
              </span> */}
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="number">Phone Number</label>
              <input
                onChange={(e) => setFdata({ ...fData, phone: e.target.value })}
                value={fData.phone}
                type="number"
                id="number"
                className="border px-4 py-2 w-full focus:outline-none"
              />
            </div>
            
            <div className="col-1 p-0">
            <label for="gender">Gender</label>
            <select id="gender" className="border mt-1">
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="image">Profile Image</label>
              <input
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    error: false,
                    success: false,
                    photo: [...e.target.files],
                  })
                }
                type="file"
                accept=".jpg, .jpeg, .png"
                className="px-4 py-2 border focus:outline-none"
                id="image"
                name="images"
              />
              <button className="m-4 bg-white hover:bg-gray-100 text-gray-800 
          font-semibold py-2 px-4 border border-gray-400 rounded shadow w-24" onClick={uploadProfile}>Update Image</button>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="name">Date Of Birth</label>
              <input
                // onChange={(e) => setFdata({ ...fData, name: e.target.value })}
                // value={fData.name}
                type="date"
                // id="name"
                className="border px-4 py-2 w-full focus:outline-none"
              />
            </div>
            <div
              onClick={(e) => history.push("/user/setting")}
              style={{ background: "#FFF" }}
              className="w-full text-center cursor-pointer px-4 py-2 text-black border-2 border-gray"
            >
              Change Password
            </div>
            <div
              onClick={(e) => handleSubmit()}
              style={{ background: "#303031" }}
              className="w-full text-center cursor-pointer px-4 py-2 text-gray-100"
            >
              Update Information
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserProfile = (props) => {
  return (
    <Fragment>
      <Layout children={<ProfileComponent />} />
    </Fragment>
  );
};

export default UserProfile;
