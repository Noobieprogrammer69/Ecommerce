import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import cartAtom from '../atom/cartAtom';
import { FaImage } from 'react-icons/fa';
import { FaCartPlus } from "react-icons/fa";
import { useRecoilState } from 'recoil';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useRecoilState(cartAtom);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                // const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCart = () => {
        if(product) {
            setCart((prevCart) => [...prevCart, product])
        }
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold my-4">{product.title}</h1>
            <div className="relative w-64 h-64 mx-auto mb-4">
                <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                <FaImage className="absolute bottom-2 right-2 text-gray-500" />
            </div>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-600 mb-4">{product.rating.rate} ({product.rating.count} reviews)</p>
            <p className="text-xl font-semibold">${product.price}</p>
            <div className='mr-5 mt-2'>
                <button onClick={addToCart} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <FaCartPlus />
                </button>
            </div>
        </div>
    );
};

export default Product;
