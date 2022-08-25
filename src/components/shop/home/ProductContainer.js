
import React, { Fragment, useState, useEffect, useContext } from "react";
import { getProductByCategory } from "../dashboardUser/FetchApi";
import { useHistory } from "react-router-dom";
const apiURL = process.env.REACT_APP_API_URL;
const ProductContainer = ({ category }) => {
    const [products, setProducts] = useState([{ pName: "Loading", pImages: ["loading"] }])
    useEffect(() => {
        if (category) {
            getProductByCategory(category).then(result => {
                console.log("For Category " + category + " :")
                console.log(result);
                setProducts([])
                setProducts(result)
            })
        }
    }, [])
    const history = useHistory();

    return (
        <div className='featured-products'>
            {products.map(product => (
                // <div className='product-container border-solid border-2'>
                //     <div className='featured-img h-40 w-40'>
                //         <img src={`${apiURL}/api/photo/get-photo/${product.pImages[0]}`} alt="featured-product-img" />
                //     </div>
                //     <div className='featured-text text-center'>
                //         <h6>{product.pName}</h6>
                //     </div>
                // </div>
                <Fragment>
                    <div className="products-server drop-shadow-2xl">
                        <div className="relative m-1 border-2 bg-origin-content bg-gray-100 h-56 w-48 md:w-56 rounded-lg">
                            <img
                                onClick={(e) => history.push(`/products/${product._id}`)}
                                className="w-full h-40 w-40 object-scale-down object-center cursor-pointer p-2 shadow-2xl"
                                src={`${apiURL}/api/photo/get-photo/${product.pImages[0]}`}
                                alt=""
                            />
                            <div className="flex items-center justify-center mt-2">
                                <div className="text-gray-600 font-light truncate">
                                    {product.pName}
                                </div>
                            </div>
                            <div className="text-center">${product.pPrice}.00</div>
                        </div>
                    </div>
                </Fragment>
            ))}
        </div>
    )
}

export default ProductContainer