import { useState, useEffect, useCallback } from 'react';

export const useFetch = (url, message, key) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState('');

    const getProducts = useCallback(async() => {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                key: key,
                text: message,
                mode: "CBC"
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const products = await response.json();
        setProducts(products["ciphertext"]);
        setLoading(false);
    }, [url]);

    useEffect(() => {
        getProducts();
    }, [url, getProducts]);
    return { loading, products };
};