import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import electronics from './categoryImages/electronics.jpg';
import fashion from './categoryImages/fashion.jpg';
import beauty from './categoryImages/beauty.png';
import fruit from './categoryImages/fruit.jpg';
import './style.css';

const apiURL = process.env.REACT_APP_API_URL;
function ProductCategoryDropdown({ categories }) {
    return (
        <div class="category px-2">
            <table>
                <tr>
                    {categories.map(category => (
                        <th class="cat-item" key={category._id}><a href={`/category/${category.cName}`}><img class="aspect-square md:h-32 md:w-32 h-16 w-16 rounded-full object-cover" src={`${apiURL}/api/photo/get-photo/${category.cImage}`} alt={category.cName} /></a></th>
                    ))}
                </tr>
                <tr class="cat-text">
                    {categories.map(category => (
                        <td key={category._id}>{category.cName}</td>
                    ))}
                </tr>
            </table>

        </div>
    );
}

export default ProductCategoryDropdown;
