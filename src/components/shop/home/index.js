import React, { Fragment, createContext, useReducer } from "react";
import Layout from "../layout";
import TopCarousel from "./TopCarousel.js";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";
import FeaturedProducts from "./FeaturedProducts";
import AllProducts from "./AllProducts";
import Slider from "./Slider";


export const HomeContext = createContext();

const HomeComponent = () => {
  return (
    <Fragment>
      {/* <Slider />  Its being shifted down*/}
      {/* Category, Search & Filter Section */}
      <section className="m-1 md:mx-8 md:my-6 header">
        <ProductCategory />
      </section>

      {/* FeaturedProducts section added */}
      <FeaturedProducts />

      <Slider />

      {/* Products by different categories */}
      <AllProducts />

      {/* Product Section */}
      <section className="m-4 md:mx-8 md:my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* <SingleProduct /> */}
      </section>
    </Fragment>
  );
};

const Home = (props) => {
  const [data, dispatch] = useReducer(homeReducer, homeState);
  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <Layout children={<HomeComponent />} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;
