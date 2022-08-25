import React from "react";
// import ad1 from "./images/ad1.jpg";
// import ad2 from "./images/ad2.jpg";
// import laptop from "./images/laptop.jpg";
// import laptop2 from "./images/laptop2.jpg";
// // import ipad from "./images/ipad.jpg";
// import mobile from "./images/mobile.jpg";
// import mobile2 from "./images/mobile2.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";
const apiURL = process.env.REACT_APP_API_URL;

function ProductsAds({ categories }) {
    console.log("These are the categories");
    console.log(categories);
    return (
        <div className="first-container">
            <div className='products grid grid-cols-2 gap-1 md:grid-cols-6'>
                {categories.map(category => (
                    // <span>{category.cName}</span>
                    <div className='border-light border-2 container'>
                        <div className='img h-32  object-center pt-1'>
                            <img src={`${apiURL}/api/photo/get-photo/${category.cImage}`} alt="product-img" />
                        </div>
                        <div className='text-center'>
                            <p className="text">{category.cName}</p>
                            <p className="tag">{category.cDescription}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsAds