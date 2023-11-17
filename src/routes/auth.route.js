const express = require('express');
const validationMiddleware = require('../middlewares/validations.middleware');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.createUserValidation,
  authController.SignUp
);

router.post(
  '/signin',
  validationMiddleware.signinUserValidation,
  authController.SignIn
);

module.exports = router;
