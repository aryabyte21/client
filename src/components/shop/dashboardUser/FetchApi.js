import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getUserById = async (uId) => {
  try {
    let res = await axios.post(`${apiURL}/api/user/single-user`, { uId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePersonalInformationFetch = async (userData) => {
  try {
    let res = await axios.post(`${apiURL}/api/user/edit-user`, userData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByUser = async (uId) => {
  try {
    let res = await axios.post(`${apiURL}/api/order/order-by-user`, { uId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (formData) => {
  try {
    let res = await axios.post(`${apiURL}/api/user/change-password`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCategories = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/category/all-category`);
    return res.data.Categories;
  } catch (e) {
    console.log(e);
  }
}
export const getProductByCategory = async (category) => {
  try {
    let res = await axios.get(`${apiURL}/api/category/${category}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
}