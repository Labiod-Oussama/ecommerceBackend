const { Router } = require('express');
const CartController=require('../controllers/CartController');
const router=Router();

router.post('/Cart',CartController.saveToCart);
router.get('/getCarts/:id',CartController.getCarts);
router.post('/deleteCart',CartController.deleteCart);

module.exports=router;