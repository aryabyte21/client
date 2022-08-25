import React, { useState, useEffect } from "react";
import { Navber } from "../partials";
import { Footer } from "../partials";
import ProductsAds from "./ProductsAds";
import ProductsAdsSec from "./ProductsAdsSec";
import { getCategories } from "../dashboardUser/FetchApi";



function CategoryListing() {
    const [data, setData] = useState([{ cName: "Loading" }]);
    useEffect(() => {
        getCategories().then(result => {
            setData(result);
        })
    }, [])

    return (
        <div>
            <Navber />
            <ProductsAds categories={data} />
            <Footer />

        </div>
    );
}

export default CategoryListing;