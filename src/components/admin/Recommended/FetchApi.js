import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getAllProduct = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/product/all-product`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllRecommended = async () => {
  let products = []
  try {
    let res = await axios.get(`${apiURL}/api/recommended/get-recommended`);
    res.data.map(async product => {
      let data = { 'pId': product.productId };
      let res = await axios({
        method: 'post',
        url: `${apiURL}/api/product/single-product`,
        data: data,
      });
      await products.push(res.data.Product);
    })
    return { 'Products': products };
  } catch (error) {
    console.log(error);
  }
}

export const createPorductImage = async ({ pImage }) => {
  /* Most important part for uploading multiple image  */
  let formData = new FormData();
  for (const file of pImage) {
    formData.append("pImage", file);
  }
  /* Most important part for uploading multiple image  */
};

export const createProduct = async ({
  pName,
  pDescription,
  pImage,
  pStatus,
  pCategory,
  pQuantity,
  pPrice,
  pOffer,
}) => {
  /* Most important part for uploading multiple image  */
  let formData = new FormData();
  for (const file of pImage) {
    formData.append("pImage", file);
  }
  /* Most important part for uploading multiple image  */
  formData.append("pName", pName);
  formData.append("pDescription", pDescription);
  formData.append("pStatus", pStatus);
  formData.append("pCategory", pCategory);
  formData.append("pQuantity", pQuantity);
  formData.append("pPrice", pPrice);
  formData.append("pOffer", pOffer);

  try {
    let res = await axios.post(`${apiURL}/api/product/add-product`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (product) => {
  console.log(product);
  /* Most important part for updating multiple image  */
  let formData = new FormData();
  if (product.pEditImages) {
    for (const file of product.pEditImages) {
      formData.append("pEditImages", file);
    }
  }
  /* Most important part for updating multiple image  */
  formData.append("pId", product.pId);
  formData.append("pName", product.pName);
  formData.append("pDescription", product.pDescription);
  formData.append("pStatus", product.pStatus);
  formData.append("pCategory", product.pCategory._id);
  formData.append("pQuantity", product.pQuantity);
  formData.append("pPrice", product.pPrice);
  formData.append("pOffer", product.pOffer);
  formData.append("pImages", product.pImages);

  try {
    let res = await axios.post(`${apiURL}/api/product/edit-product`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (pId) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/delete-product`, { pId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const productByCategory = async (catId) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/product-by-category`, {
      catId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const productByPrice = async (price) => {
  try {
    let res = await axios.post(`${apiURL}/api/product/product-by-price`, {
      price,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const uploadImage = async (image) => {
  let imageIds;
  const bodyFormData = new FormData();
  for (let i = 0; i < image.length; i++) {
    bodyFormData.append('images', image[i]);

  }
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  console.log(bodyFormData);
  const url = `${apiURL}/api/photo/add-photo`;
  await axios.post(url, bodyFormData, config)
    .then(async (response) => {
      imageIds = await response.data['Files Object Id'].split(',').slice(0, 3);
      await console.log(imageIds);
      return await imageIds;
    }).catch((e) => {
      console.log(e.message);
    })
  return imageIds;
}
const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;

   

// export const addRecommended = async (pId) => {
//   let data = { 'pId': pId };
//   console.log(data)
//   try {
//     let res = await axios.post(
//       `${apiURL}/api/recommended/add-recommended`,
//       data,
//       {headers:{
//         'token':`Bearer ${BearerToken()}`,
//         'content':'application/json'
//       }}
//     );
//     console.log(res)
//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// }
export const getRecommended = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/recommended/get-recommended`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
export const addRecommended = async (pId) => {
  let data = { 'pId': pId };
  console.log(data)
        let res = await axios.post(`${apiURL}/api/recommended/add-recommended`,{'pId':pId}, {headers:{
          'token':`Bearer ${BearerToken()}`,
          'content':'application/json;charset=UTF-8'
        }});
        console.log(res)
}