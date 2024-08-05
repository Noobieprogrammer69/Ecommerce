import { useState } from "react";
import getStripe from "../lib/getStripe";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import cartAtom from "../atom/cartAtom";

const CheckOutPage = () => {
  const [form, setForm] = useState({
    email: "",
    streetAddress: "",
    firstName: "",
    lastName: "",
    phone: "",
    postalCode: "",
  });
  const location = useLocation();
  const { productIds } = location.state;
  const [cart, setCart] = useRecoilState(cartAtom);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckOutSessionSubmit = async (e) => {
    e.preventDefault()
    try {
      const buyingRes = await fetch("/api/buyingProducts/buying", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...form,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          streetAddress: form.streetAddress,
          phone: form.phone,
          postalCode: form.postalCode,
        })
      })

      if(!buyingRes.ok) {
        throw new Error('Failed to Buy a product');
      }

      const buyingData = await buyingRes.json()
      const buyingId = buyingData._id

      const stripeResponse = await fetch("/api/buyingProducts/create-checkout-session", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          buyingId,
          productIds,
        }),
      })

      if (!stripeResponse.ok) {
        const errorResponse = await stripeResponse.json();
        throw new Error(`Failed to create Stripe checkout session: ${errorResponse.error}`);
      }

      const stripeData = await stripeResponse.json();

      const updatedCart = cart.filter(product => !productIds.includes(product.id));
      setCart(updatedCart);

      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId: stripeData.id });

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto border border-gray-200">
        <form className="space-y-5">
          <div className="relative z-0 w-full group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={form.email}
              onChange={handleChange}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full group">
            <input
              type="text"
              name="streetAddress"
              id="streetAddress"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={form.streetAddress}
              onChange={handleChange}
            />
            <label
              htmlFor="streetAddress"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={form.firstName}
                onChange={handleChange}
              />
              <label
                htmlFor="firstName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First Name
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={form.lastName}
                onChange={handleChange}
              />
              <label
                htmlFor="lastName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last Name
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full group">
              <input
                type="tel"
                name="phone"
                id="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={form.phone}
                onChange={handleChange}
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone #
              </label>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={form.postalCode}
                onChange={handleChange}
              />
              <label
                htmlFor="postalCode"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Postal Code
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={handleCheckOutSessionSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOutPage;
