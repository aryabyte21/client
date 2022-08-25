import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;
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

export const getAllCategory = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/category/all-category`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async ({
  cName,
  cImage,
  cDescription,
  cStatus,
}) => {
  let formData = new FormData();
  formData.append("cImage", cImage);
  formData.append("cName", cName);
  formData.append("cDescription", cDescription);
  formData.append("cStatus", cStatus);
  console.log(formData)
  let data = {'cName':cName,'cImage':cImage,'cDescription':cDescription,'cStatus':cStatus}
  try {
    let res = await axios.post(
      `${apiURL}/api/category/add-category`,
      data,
      {headers:{
        'token':`Bearer ${BearerToken()}`,
        'content':'application/json'
      }}
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editCategory = async (cId, des, status) => {
  let data = { cId: cId, cDescription: des, cStatus: status };
  try {
    let res = await axios.post(
      `${apiURL}/api/category/edit-category`,
      data,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (cId) => {
  try {
    let res = await axios.post(
      `${apiURL}/api/category/delete-category`,
      { cId },
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const uploadCategoryImage = async (image) => {
  let imageIds;
  const bodyFormData = new FormData();
  bodyFormData.append('images', image);
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  console.log(bodyFormData);
  const url = 'http://localhost:8000/api/photo/add-category-photo';
  await axios.post(url, bodyFormData, config)
    .then(async (response) => {
      imageIds = response.data['Files Object Id'];
    }).catch((e) => {
      console.log(e.message);
    })
  return imageIds;
}