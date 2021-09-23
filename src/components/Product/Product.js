import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Products.css';

const Product = (props) => {
    const { name, img, seller, stock, price } = props.product
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <p><small>by: {seller}</small></p>
                <p>Price: {price}</p>
                <p>only {stock} left in stock - order soon</p>
                <button onClick={() => props.handleAddToCart(props.product)} className="btn-regular"><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
            </div>
        </div>
    );
};

export default Product;