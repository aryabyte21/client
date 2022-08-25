import React, { Fragment, useContext, useState, useEffect } from "react";
import ProductCategoryDropdown from "./ProductCategoryDropdown";
import { HomeContext } from "./index";
import { getCategories } from "../dashboardUser/FetchApi";
const ProductCategory = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const [categories, setData] = useState([{ cName: "Loading" }]);
  useEffect(() => {
    getCategories().then(result => {
      setData(result);
    })
  }, [])
  return (
    <Fragment>
      <div className="flex justify-between font-medium">
        <div className="flex space-x-2">
          <div
            onClick={(e) =>
              dispatch({
                type: "filterListDropdown",
                payload: !data.filterListDropdown,
              })
            }
            className={`flex items-center space-x-1 cursor-pointer ${data.filterListDropdown ? "text-yellow-700" : ""
              }`}
          >
          </div>
        </div>
      </div>
      <ProductCategoryDropdown categories={categories} />
    </Fragment>
  );
};

export default ProductCategory;