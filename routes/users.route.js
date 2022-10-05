const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../middleware/multer');
const registerController = require('../controllers/users/register');
const loginController = require('../controllers/users/login');
const getInstanceController = require('../controllers/users/getInstance');
const updateController = require('../controllers/users/update');
const avatarController = require('../controllers/users/avatar');
const deleteController = require('../controllers/users/delete');

const router = express.Router();

router.get('/me', verifyToken, getInstanceController);
router.post('/register', registerController);
router.post('/login', loginController);
router.patch('/update', verifyToken, updateController);
router.patch('/avatar', verifyToken, upload.single('avatar'), avatarController);
router.delete('/delete', verifyToken, deleteController);

module.exports = router;
