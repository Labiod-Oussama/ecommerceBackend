const { Router } = require('express');
const ProductsController=require('../controllers/ProductsController');
const router=Router();

router.post('/Products',ProductsController.getProducts);
router.get('/Products/:id',ProductsController.getOneProduct);
router.get('/getFeatured',ProductsController.getFeatured);
router.post('/Suggestion',ProductsController.getSuggestion);
router.post('/ProductSearch',ProductsController.getProductsSearching);

module.exports=router;