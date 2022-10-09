import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    // ______________update add to cart______________________
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => product._id === item._id)

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        // check if product is already present in the cart
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProducts) => {
                if (cartProducts._id === product._id) return {
                    ...cartProducts,
                    quantity: cartProducts.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the Cart.`);
    }
    // _________________________________________________________

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);

        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);

        setCartItems(newCartItems);
    }

    // __________Update Cart Item Quantity_________
    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);
        // const newCartItems = cartItems.filter((item) => (item._id !== id))
        const newCartItems = cartItems

        if (value === 'inc') {
            // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            newCartItems.splice(index, 1, {
                ...foundProduct,
                quantity: foundProduct.quantity + 1,
            });

            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);

            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)

        } else if (value === 'dec') {

            if (foundProduct.quantity > 1) {
                // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                newCartItems.splice(index, 1, {
                    ...foundProduct,
                    quantity: foundProduct.quantity - 1,
                });

                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);

                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
            }
        }
        setCartItems(newCartItems)
    }
    // ____________________________________________

    // ______________update quantity______________
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1; //else return this
        });
    }
    // ____________________________________________

    return (
        <Context.Provider
            value={
                {
                    showCart, cartItems, totalPrice, totalQuantities, qty, incQty, decQty, onAdd, setShowCart, toggleCartItemQuanitity, onRemove, setCartItems, setTotalPrice, setTotalQuantities
                }
            }>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);