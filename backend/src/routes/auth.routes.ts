import { Router } from "express"
import { AuthController } from "../controllers/auth.controller"
import { body, param } from "express-validator"
import { handleInputErrors } from "../middleware/validation.middleware"
import { limiter } from "../connection/limit"
import { authenticate } from "../middleware/auth.middleware"

const router = Router()

router.use(limiter)

router.post(
  '/create-account',
  body('email')
    .isEmail().withMessage('Email is invalid'),
  body('name')
    .notEmpty().withMessage('Username is required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  handleInputErrors,
  AuthController.createAccount
)

router.post(
  '/confirm-account',
  body('token')
    .isLength({ min: 6, max: 6 }).withMessage('Token must be at least 6 characters long')
    .notEmpty().withMessage('Token is required'),
  handleInputErrors,
  AuthController.confirmAccount
)

router.post(
  '/login',
  body('email')
    .isEmail().withMessage('Email is invalid'),
  body('password')
    .notEmpty().withMessage('Password is required'),
  handleInputErrors,
  AuthController.login
)

router.post(
  '/forgot-password',
  body('email')
    .isEmail().withMessage('Email is invalid'),
  handleInputErrors,
  AuthController.forgotPassword
)

router.post(
  '/validate-token',
  body('token')
    .isLength({ min: 6, max: 6 }).withMessage('Token must be at least 6 characters long')
    .notEmpty().withMessage('Token is required'),
  handleInputErrors,
  AuthController.validateToken
)

router.post(
  '/reset-password/:token',
  param('token')
    .isLength({ min: 6, max: 6 }).withMessage('Token must be at least 6 characters long')
    .notEmpty().withMessage('Token is required'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  handleInputErrors,
  AuthController.resetPasswordWithToken
)

router.post(
  '/user',
  authenticate,
  AuthController.user
)

router.post(
  '/update-password',
  authenticate,
  body('current_password')
    .notEmpty().withMessage('Current password is required'),
  body('password')
    .isLength({ min: 8 }).withMessage('New password must be at least 8 characters long'),
  handleInputErrors,
  AuthController.updatePassword
)

router.post(
  '/check-password',
  authenticate,
  body('password')
    .notEmpty().withMessage('Current password is required'),
  handleInputErrors,
  AuthController.checkPassword
)

export default router