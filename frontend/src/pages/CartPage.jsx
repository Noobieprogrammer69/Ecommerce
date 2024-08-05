import { useRecoilState } from 'recoil';
import cartAtom from '../atom/cartAtom';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// const stripePromise = loadStripe('pk_test_51Pk1gr0631DQotGCm6ifogaPgoQFHyY1qllrf9kCWbsql5fUqGKVbK61DtenGcPs4AzaoN6kzRk14Uhj40715XKF007fSCxT3f');

const CartPage = () => {
    const [cart, setCart] = useRecoilState(cartAtom);
    const navigate = useNavigate();

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const handleCheckout =  () => {
        const productIds = cart.map(product => product.id);

        navigate("/cart/checkout", { state: { productIds } })
    };
 
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((product) => (
                        <div key={product.id} className="border p-4 rounded-lg shadow-md mb-4 flex items-center">
                            <img src={product.image} alt={product.title} className="w-24 h-24 object-cover mr-4" />
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold">{product.title}</h2>
                                <p className="text-gray-600">${product.price}</p>
                                <button
                                    onClick={() => removeFromCart(product.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash /> Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={handleCheckout}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;

