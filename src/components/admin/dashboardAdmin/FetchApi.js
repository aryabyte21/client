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
export const DashboardData = async () => {
  try {
    let res = await axios.post(`${apiURL}/api/customize/dashboard-data`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSliderImages = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/customize/get-slide-image`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postUploadImage = async (formData) => {
  try {
    let res = await axios.post(
      `${apiURL}/api/customize/upload-slide-image`,
      formData
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteImage = async (id) => {
  try {
    let res = await axios.post(`${apiURL}/api/customize/delete-slide-image`, {
      id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const uploadImage = async (image) => {
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
export const uploadSliderImage = async (id) => {
  const url = "http://localhost:8000/api/customize/upload-slide-image";
  const data = {'id':id}
  await axios.post(url,data).then(response => {
    return response
  }).catch(e => {
    return e
  })
}