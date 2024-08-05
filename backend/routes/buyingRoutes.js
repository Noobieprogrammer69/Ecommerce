const productCtrl = require("../controllers/productCtrl")
const router = require("express").Router();

router.post("/buying", productCtrl.buyingProducts);
router.post("/create-checkout-session", productCtrl.getCheckoutSession)
router.get("/:id", productCtrl.getProductById)

module.exports = router;
