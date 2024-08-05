import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                if (response.status === 200) {
                    setProducts(response.data);
                    console.log(response);
                } else {
                    console.error(`Unexpected response status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching products:', error.message);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Request data:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className="container mx-auto px-4 py-5">
            <h1 className="text-2xl font-bold my-4">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product.id} className="border p-4 rounded-lg shadow-md">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
                        <h2 className="text-lg font-semibold">{product.title}</h2>
                        <p className="text-gray-600">${product.price}</p>
                        <Link to={`/product/${product.id}`} className="text-blue-500">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
