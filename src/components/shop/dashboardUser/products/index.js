import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../../../admin/layout";
import ProductMenu from "./ProductMenu";
import ProductTable from "./ProductTable";
import { productState, productReducer } from "./ProductContext";
import { Navber } from "../../partials";

/* This context manage all of the products component's data */
export const ProductContext = createContext();

const ProductComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      {/* ProductMenu renders add product modal */}
      <ProductMenu />
      
      {/* Product table is used to show products added by you in past */}
      {/* <ProductTable /> */}
    </div>
  );
};

const Products = (props) => {
  /* To use useReducer make sure that reducer is the first arg */
  const [data, dispatch] = useReducer(productReducer, productState);

  return (
    <Fragment>
      <ProductContext.Provider value={{ data, dispatch }}>
        {/* <Navber/>}
        <ProductComponent /> */}
        <Navber/>
         <ProductComponent />
      </ProductContext.Provider>
    </Fragment>
  );
};

export default Products;
