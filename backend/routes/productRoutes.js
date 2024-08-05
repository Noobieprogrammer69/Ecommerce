const router = require("express").Router();
const productCtrl = require("../controllers/productCtrl");

router.get('/products/search', productCtrl.fetchProducts);

module.exports = router;
