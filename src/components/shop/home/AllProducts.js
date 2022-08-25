import React, { useEffect, useState } from 'react';
import './style.css';
import { getCategories } from '../dashboardUser/FetchApi';
import ProductHeader from './ProductHeader';

function AllProducts() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories().then(result => {
            setCategories(result);
        })
        // Get all the products for corresponding categories;

    }, [])

    return (
        <div>


            {/* Electronics Products */}
            <div className='all-products'>
                <ProductHeader categories={categories} />
            </div>



        </div>
    );
}

export default AllProducts