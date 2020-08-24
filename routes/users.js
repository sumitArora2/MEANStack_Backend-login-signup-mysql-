const express =require('express');
const router = express();
const user=require('../controllers/Users');


router.route('/profile').get(user.profile);
router.route('/login').post(user.login);
router.route('/register').post(user.register);


module.exports = router;