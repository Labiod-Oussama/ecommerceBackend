const { Router } = require('express');
const registerContoller = require('../controllers/RegisterController');
const router = Router();

router.post('/signup', registerContoller.signup);
router.post('/login',registerContoller.login)


module.exports = router;
