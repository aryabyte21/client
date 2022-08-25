import React from 'react';
import nike from './featuredImages/nike.png';
import ipad from '../categoryListing/images/ipad.png'
import './style.css';

function FeaturedProducts() {
    return (

        <div>

            <div className='product-header'>
                <div className='recommended-for-you'>
                    Recommended for you
                </div>
                <div className='view-all'>
                    View all
                </div>
            </div>

            <div className='featured-products'>
                <div className='product-container border-solid border-2'>
                    <div className='featured-img h-40 w-40'>
                        <img src={nike} alt="featured-product-img" />
                    </div>
                    <div className='featured-text text-center'>
                        <h6>Shoe!</h6>
                    </div>
                </div>

                <div className='product-container border-solid border-2'>
                    <div className='featured-img h-40 w-40'>
                        <img src={ipad} alt="featured-product-img" />
                    </div>
                    <div className='featured-text text-center'>
                        <h6>Shoe!</h6>
                    </div>
                </div>

                <div className='product-container border-solid border-2'>
                    <div className='featured-img h-40 w-40'>
                        <img src={nike} alt="featured-product-img" />
                    </div>
                    <div className='featured-text text-center'>
                        <h6>Shoe!</h6>
                    </div>
                </div>

                <div className='product-container border-solid border-2'>
                    <div className='featured-img h-40 w-40'>
                        <img src={nike} alt="featured-product-img" />
                    </div>
                    <div className='featured-text text-center'>
                        <h6>Shoe!</h6>
                    </div>
                </div>

                <div className='product-container border-solid border-2'>
                    <div className='featured-img h-40 w-40'>
                        <img src={nike} alt="featured-product-img" />
                    </div>
                    <div className='featured-text text-center'>
                        <h6>Shoe!</h6>
                    </div>
                </div>

            </div>

        </div>

    );
}

export default FeaturedProducts
