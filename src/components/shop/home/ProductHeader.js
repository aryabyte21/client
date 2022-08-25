import React from 'react'
import ProductContainer from './ProductContainer';
const apiURL = process.env.REACT_APP_API_URL;
const ProductHeader = ({ categories }) => {
    return (
        <div>
            {categories.map(category => (
                <div className='all-products'>
                    <div className='product-header'>
                        <div className='recommended-for-you'>
                            {category.cName}
                        </div>
                        <div className='view-all'>
                            <a href={`/category/${category.cName}`}>View all</a>
                        </div>
                    </div>
                    <ProductContainer category={category.cName} />
                </div>
            ))}

        </div>
    )

}

export default ProductHeader