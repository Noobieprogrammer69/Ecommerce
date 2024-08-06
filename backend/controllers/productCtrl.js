const Product = require("../models/productModel");
const Buying = require("../models/informationModel")
const axios = require("axios");
const { sendEmail } = require("../services/emailService");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const productCtrl = {
    buyingProducts: async (req, res) => {
        const { firstName, lastName, email, streetAddress, phone, postalCode } = req.body
        try {
            const newBuying = new Buying({
                firstName, lastName, email, streetAddress, phone, postalCode
            })

            await newBuying.save()
            await sendEmail(email, newBuying);

            res.status(201).json(newBuying)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    fetchProducts: async (req, res) => {
        const { query } = req.query;
        try {
          let products;
          if (query) {
            products = await Product.find({ title: { $regex: query, $options: 'i' } }); // Assuming title is the field you want to search
          } else {
            products = await Product.find();
            if (products.length === 0) {
              const response = await axios.get("https://fakestoreapi.com/products");
              const productsData = response.data;
              await Product.insertMany(productsData);
              products = productsData;
            }
          }
          res.json(products);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      },
    
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getCheckoutSession: async (req, res) => {   
        try {
            const { productIds } = req.body;
    
            if (!Array.isArray(productIds) || productIds.length === 0) {
                throw new Error('Invalid product IDs');
            }
    
            const lineItems = await Promise.all(productIds.map(async (productId) => {
                const productResponse = await axios.get(`https://fakestoreapi.com/products/${productId}`);
                const product = productResponse.data;
    
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.title,
                            images: [product.image],
                        },
                        unit_amount: product.price * 100, 
                    },
                    quantity: 1,
                };
            }));
    
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: "http://localhost:5000/success", 
                cancel_url: "http://localhost:5000/success",   
            });
    
            res.json({ id: session.id });
        } catch (e) {
            console.error('Error in getCheckoutSession:', e.message, e);
            res.status(500).json({ error: e.message });
        }
    },

    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
            res.json(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
            res.status(500).json({ message: 'Error fetching product' });
        }
    
    }
};

module.exports = productCtrl;

