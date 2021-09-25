import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import { addToDb, getStoredCart } from "../../utilities/fakedb"
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    useEffect(() => {
        fetch('./products.json')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setDisplayProducts(data)
            })
    }, []);

    useEffect(() => {
        if (products.length) {
            const saveCart = getStoredCart();
            const storedCart = [];
            for (const key in saveCart) {
                const addedProduct = products.find(product => key === product.key);
                if (addedProduct) {
                    const quantity = saveCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct)
                }
            }
            setCart(storedCart)
        }
    }, [products])
    const handleAddToCart = product => {
        // const newCart = [...cart, product];
        // setCart(newCart);
        // //save to local storage for now
        // addToDb(product.key);

        let exist = false;
        for (const c of cart) {
            if (c.key === product.key) {
                exist = true;
                c.quantity = c.quantity + 1;
            }
        }
        if (!exist) {

            const newCart = [...cart, product];
            setCart(newCart);
        }
        else {

            const newCart = [...cart];
            setCart(newCart);
        }


        // save to local sotrage
        addToDb(product.key);
    }

    const handleSearch = e => {
        const searchText = e.target.value;
        const matchProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchProducts)

    }
    return (
        <>
            <div className="search-container">
                <input onChange={handleSearch} type="text" placeholder="Search Product" />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    <h3>Available Products: {displayProducts.length}</h3>
                    {
                        displayProducts.map(product => <Product
                            key={product.key}
                            handleAddToCart={handleAddToCart}
                            product={product}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;