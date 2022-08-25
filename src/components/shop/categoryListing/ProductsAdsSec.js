import React from "react";
// import ad1 from "./images/ad1.jpg";
// import ad2 from "./images/ad2.jpg";
// import laptop from "./images/laptop.jpg";
// import laptop2 from "./images/laptop2.jpg";
// import ipad from "./images/ipad.jpg";
// import mobile from "./images/mobile.jpg";
// import mobile2 from "./images/mobile2.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";

function ProductsAdsSec() {
    return (
        <div className="main-container">
            <div className='products2 grid grid-cols-2 gap-1 md:grid-cols-6'>

                <div className='border-light border-2 container'>
                    <div className='img h-32 w-32 object-center pt-1'>
                        {/* <img src={mobile} alt="product-img" /> */}
                    </div>
                    <div className='text-center'>
                        <h6 className="text">Mobile</h6>
                        <h6 className="tag">$100</h6>
                    </div>
                </div>

                <div className='border-light border-2 container'>
                    <div className='img h-32 w-32 object-center pt-1'>
                        {/* <img src={mobile2} alt="product-img" /> */}
                    </div>
                    <div className='text-center'>
                        <h6 className="text">Iphone 12</h6>
                        <h6 className="tag">$100</h6>
                    </div>
                </div>

                <div className='border-light border-2 container'>
                    <div className='img h-32 w-32 object-center pt-1'>
                        {/* <img src={laptop} alt="product-img" /> */}
                    </div>
                    <div className='text-center'>
                        <h6 className="text">Laptop</h6>
                        <h6 className="tag">$100</h6>
                    </div>
                </div>

                <div className='border-light border-2 container'>
                    <div className='img h-32 w-32 object-center pt-1'>
                        {/* <img src={laptop2} alt="product-img" /> */}
                    </div>
                    <div className='text-center'>
                        <h6 className="text">Legion</h6>
                        <h6 className="tag">$100</h6>
                    </div>
                </div>

                <div className='border-light border-2 container'>
                    <div className='img h-32 w-32 object-center pt-1'>
                        {/* <img src={ipad} alt="product-img" /> */}
                    </div>
                    <div className='text-center'>
                        <h6 className="text">IPad</h6>
                        <h6 className="tag">$100</h6>
                    </div>
                </div>

                <div className='border-light border-2 container'>
                    <div className='img h-32 w-32 object-center pt-1'>
                        {/* <img src={mobile} alt="product-img" /> */}
                    </div>
                    <div className='text-center'>
                        <h6 className="text">Mobile</h6>
                        <h6 className="tag">$100</h6>
                    </div>
                </div>

            </div>

            <div className="carousel pt-3">
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            {/* <img class="d-block w-100" src={ad1} alt="First slide" /> */}
                        </div>
                        <div class="carousel-item">
                            {/* <img class="d-block w-100" src={ad2} alt="Second slide" /> */}
                        </div>
                        <div class="carousel-item">
                            {/* <img class="d-block w-100" src={ad1} alt="Third slide" /> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductsAdsSec