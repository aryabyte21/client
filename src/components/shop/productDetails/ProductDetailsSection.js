import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailsContext } from "./index";
import { LayoutContext } from "../layout";
// import Submenu from "./Submenu";
// import ProductDetailsSectionTwo from "./ProductDetailsSectionTwo";

import { getSingleProduct } from "./FetchApi";
import { cartListProduct } from "../partials/FetchApi";

import { isWishReq, unWishReq, isWish } from "../home/Mixins";
import { updateQuantity, slideImage, addToCart, cartList } from "./Mixins";
import { totalCost } from "../partials/Mixins";
import FeaturedProducts from "../home/FeaturedProducts";
import star from "./star.png";
// import { Modal } from "bootstrap";
import ReviewForm from "./ReviewForm";
import Modal from "./Modal";
import TopCarousel from "./TopCarousel";
import './style.css';
import { isAuthenticate } from "../auth/fetchApi";
import AllReviews from "./AllReviews";


const apiURL = process.env.REACT_APP_API_URL;

const ProductDetailsSection = (props) => {
  let { id } = useParams();

  // const for review section 
  const [openModal, setOpenModal] = useState(false);
  // background is not scrollable when review modal is open
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = openModal ? 'hidden' : 'auto';
  }, [openModal])


  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData, dispatch: layoutDispatch } =
    useContext(LayoutContext); // Layout Context

  const sProduct = layoutData.singleProductDetail;
  const [pImages, setPimages] = useState(null);
  const [count, setCount] = useState(0); // Slide change state
  const carouselnext = () => {
    if(sProduct.pImages.length -1 > count){
      setCount(count+1);
    }
    else{
    setCount(0);
    }
  }
  const carouselprev = () => {
    if(count <= 0)
    setCount(sProduct.pImages.length -1);
    else{
      setCount(count-1);
    }
  }
  const [quantitiy, setQuantitiy] = useState(1); // Increse and decrese quantity state
  const [, setAlertq] = useState(false); // Alert when quantity greater than stock

  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  ); // Wishlist State Control

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getSingleProduct(id);
      setTimeout(() => {
        if (responseData.Product) {
          layoutDispatch({
            type: "singleProductDetail",
            payload: responseData.Product,
          }); // Dispatch in layout context
          setPimages(responseData.Product.pImages);
          dispatch({ type: "loading", payload: false });
          layoutDispatch({ type: "inCart", payload: cartList() }); // This function change cart in cart state
        }
        if (responseData.error) {
          console.log(responseData.error);
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
    fetchCartProduct(); // Updating cart total
  };

  const fetchCartProduct = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        layoutDispatch({ type: "cartProduct", payload: responseData.Products }); // Layout context Cartproduct fetch and dispatch
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return (
      <div className="col-span-2 md:col-span-3 lg:col-span-4 flex items-center justify-center h-screen">
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
  } else if (!sProduct) {
    return <div>No product</div>;
  }

  return (
    <Fragment>
      {/* <Submenu
        value={{
          categoryId: sProduct.pCategory._id,
          product: sProduct.pName,
          category: sProduct.pCategory.cName,
        }}
      /> */}
      <div className="main-container px-4">

        {/*top section  */}
        <section>
          <div className="big-img px-4 relative">
            <img
              className="w-80 h-80 object-contain"
              src={`${apiURL}/api/photo/get-photo/${sProduct.pImages[count]}`}
              alt="ProductImage"
            />
            {/* <button onClick={carouselprev} className="navbuttons left m-2 bg-white hover:bg-gray-100 text-gray-800 
          font-semibold py-2 px-4 border border-gray-400 rounded-full shadow">&#9194;</button>
            <button onClick={carouselnext} className="navbuttons right m-2 bg-white hover:bg-gray-100 text-gray-800 
          font-semibold py-2 px-4 border border-gray-400 rounded-full shadow">&#9193;</button> */}

            {/* transparent buttons for product images carousel */}
            <button onClick={carouselprev} className="navbuttons text-3xl left m-2 transparent 
            text-gray-800 py-2 px-4">&#10096;</button>
              <button onClick={carouselnext} className="navbuttons text-3xl right m-2 transparent 
            text-gray-800 py-2 px-4">&#10097;</button>
          </div>
          

          <div className="flex justify-between">
            <b className="text-left px-2 ml-2">Description</b>
              <div className="mr-4">
                <span className="price-tag text-black font-medium">${sProduct.pPrice}</span>
              </div>
          </div>
          <p className="box-border border-2 h-24 w-full rounded-lg mt-2 p-2">{sProduct.pDescription}</p>
        </section>

        {/* review section  */}

        <section>
          <div className="flex justify-between mb-2">
            <h5 className="sellerInfo">SellerName</h5>
            <button className="bg-white hover:bg-gray-100 text-gray-800 
            font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={() => { setOpenModal(true); }}>
            Add Review
            </button>
            {/* <h5 className="review-tag">Review </h5> */}
            {/* <img className="review-icon" src={star} width="7%"
              height="7%" onClick={() => { setOpenModal(true); }} /> */}
          </div>
          {/* {openModal && <Modal closeModal={setOpenModal} />} */}
          <div className="p-4 h-20 border-light border-2 rounded-lg">
            <Fragment>
              {/* Uncomment for Reviews */}
      {/* <AllReviews />
      {isAuthenticate() ? (
        <ReviewForm />
      ) : (
        <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24 bg-red-200 px-4 py-2 rounded mb-4">
          You need to login in for review
        </div>
      )} */}
    </Fragment>
          </div>
            
          
          { openModal && <ReviewForm closeModal={setOpenModal} /> }

        </section>

        <section>
          <TopCarousel />
        </section>
        <section className="mb-32 mt-4 overflow-x-auto">
          <FeaturedProducts />
        </section>
      </div>
      {/* <section className="m-4 md:mx-12 md:my-6"> */}

      {/* this is the main div of the product page   */}


      {/* this is the div containing the second image of */}
      {/* the product which is visible only in laptop view  */}

      {/* <div className="hidden md:block md:col-span-1 md:flex md:flex-col md:space-y-4 md:mr-2">
            <img
              onClick={(e) =>
                slideImage("increase", 0, count, setCount, pImages)
              }
              className={`${
                count === 0 ? "" : "opacity-25"
              } cursor-pointer w-20 h-20 object-cover object-center`}
              src={`${apiURL}/api/photo/get-photo/${sProduct.pImages[0]}`}
              alt="pic"
            />
            <img
              onClick={(e) =>
                slideImage("increase", 1, count, setCount, pImages)
              }
              className={`${
                count === 1 ? "" : "opacity-25"
              } cursor-pointer w-20 h-20 object-cover object-center`}
              src={`${apiURL}/api/photo/get-photo/${sProduct.pImages[1]}`}
              alt="pic"
            />
          </div> */}

      {/* this is the div containing the product-image  */}
      {/* <div className="relative"> */}
      {/* <div className="absolute inset-0 flex justify-between items-center mb-4">
                <svg
                  onClick={(e) =>
                    slideImage("increase", null, count, setCount, pImages)
                  }
                  className="flex justify-center  w-12 h-12 text-gray-700 opacity-25 cursor-pointer hover:text-yellow-700 hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <svg
                  onClick={(e) =>
                    slideImage("increase", null, count, setCount, pImages)
                  }
                  className="flex justify-center  w-12 h-12 text-gray-700 opacity-25 cursor-pointer hover:text-yellow-700 hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div> */}
      {/* </div> */}
      {/* <div className="col-span-2 mt-8 md:mt-0 md:col-span-4 md:ml-6 lg:ml-12"> */}
      {/* <div className="flex flex-col leading-8"> */}
      {/* <div className="flex justify-between items-center"> */}
      {/* <span>
                  <svg
                    onClick={(e) => isWishReq(e, sProduct._id, setWlist)}
                    className={`${
                      isWish(sProduct._id, wList) && "hidden"
                    } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <svg
                    onClick={(e) => unWishReq(e, sProduct._id, setWlist)}
                    className={`${
                      !isWish(sProduct._id, wList) && "hidden"
                    } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span> */}
      {/* </div> */}
      {/* </div> */}
      {/* <div className="my-4 md:my-6 text-gray-600">
              {sProduct.pDescription}
            </div>
            <div className="my-4 md:my-6">
              {+quantitiy === +sProduct.pQuantity ? (
                <span className="text-xs text-red-500">Stock limited</span>
              ) : (
                ""
              )}
              <div
                className={`flex justify-between items-center px-4 py-2 border ${
                  +quantitiy === +sProduct.pQuantity && "border-red-500"
                }`}
              >
                <div
                  className={`${
                    quantitiy === sProduct.pQuantity && "text-red-500"
                  }`}
                >
                  Quantity
                </div> */}
      {/* Quantity Button */}
      {/* {sProduct.pQuantity !== 0 ? (
                  <Fragment>
                    {layoutData.inCart == null ||
                    (layoutData.inCart !== null &&
                      layoutData.inCart.includes(sProduct._id) === false) ? (
                      <div className="flex items-center space-x-2">
                        <span
                          onClick={(e) =>
                            updateQuantity(
                              "decrease",
                              sProduct.pQuantity,
                              quantitiy,
                              setQuantitiy,
                              setAlertq
                            )
                          }
                        >
                          <svg
                            className="w-5 h-5 fill-current cursor-pointer"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="font-semibold">{quantitiy}</span>
                        <span
                          onClick={(e) =>
                            updateQuantity(
                              "increase",
                              sProduct.pQuantity,
                              quantitiy,
                              setQuantitiy,
                              setAlertq
                            )
                          }
                        >
                          <svg
                            className="w-5 h-5 fill-current cursor-pointer"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>
                          <svg
                            className="w-5 h-5 fill-current cursor-not-allowed"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        <span className="font-semibold">{quantitiy}</span>
                        <span>
                          <svg
                            className="w-5 h-5 fill-current cursor-not-allowed"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </div>
                    )}
                  </Fragment>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>
                      <svg
                        className="w-5 h-5 fill-current cursor-not-allowed"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="font-semibold">{quantitiy}</span>
                    <span>
                      <svg
                        className="w-5 h-5 fill-current cursor-not-allowed"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                )} */}
      {/* Quantity Button End */}
      {/* </div> */}
      {/* Incart and out of stock button */}
      {/* {sProduct.pQuantity !== 0 ? (
                <Fragment>
                  {layoutData.inCart !== null &&
                  layoutData.inCart.includes(sProduct._id) === true ? (
                    <div
                      style={{ background: "#303031" }}
                      className={`px-4 py-2 text-white text-center cursor-not-allowed uppercase opacity-75`}
                    >
                      In cart
                    </div>
                  ) : (
                    <div
                      onClick={(e) =>
                        addToCart(
                          sProduct._id,
                          quantitiy,
                          sProduct.pPrice,
                          layoutDispatch,
                          setQuantitiy,
                          setAlertq,
                          fetchData,
                          totalCost
                        )
                      }
                      style={{ background: "#303031" }}
                      className={`px-4 py-2 text-white text-center cursor-pointer uppercase`}
                    >
                      Add to cart
                    </div> */}
      {/* )}
                </Fragment> */}
      {/* ) : (
                <Fragment>
                  {layoutData.inCart !== null &&
                  layoutData.inCart.includes(sProduct._id) === true ? (
                    <div
                      style={{ background: "#303031" }}
                      className={`px-4 py-2 text-white text-center cursor-not-allowed uppercase opacity-75`}
                    >
                      In cart
                    </div>
                  ) : (
                    <div
                      style={{ background: "#303031" }}
                      disabled={true}
                      className="px-4 py-2 text-white opacity-50 cursor-not-allowed text-center uppercase"
                    >
                      Out of stock
                    </div>
                  )} */}
      {/* </Fragment> */}
      {/* )} */}
      {/* Incart and out of stock button End */}
      {/* </div> */}
      {/* </div> */}
      {/* </section> */}
      {/* Product Details Section two */}
      {/* <ProductDetailsSectionTwo /> */}
    </Fragment>
  );
};

export default ProductDetailsSection;
