const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/auth');

const validateBody = require('../../middlewares/validateBody');

const authenticate = require('../../middlewares/authenticate');

const upload = require('../../middlewares/upload');

const { registerSchema, loginSchema, subscriptionScema } = require('../../models/user');

router.post('/register', validateBody(registerSchema), ctrl.register);

router.post('/login', validateBody(loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/', authenticate, validateBody(subscriptionScema), ctrl.updateSubscription);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);

module.exports = router;
