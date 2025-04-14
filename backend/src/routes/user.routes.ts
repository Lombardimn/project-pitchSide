import { Router } from "express"
import { UserController } from "../controllers/user.controller"
import { handleInputErrors } from "../middleware/validation.middleware"
import { validateUserExists, validateUserId, validateUserInput } from "../middleware/user.middleware"

const router = Router()

router.param('userId', validateUserId)
router.param('userId', validateUserExists)

router.get(
  '/',
  UserController.getAll
)

router.post(
  '/',
  validateUserInput,
  handleInputErrors,
  UserController.create
)

router.get(
  '/:userId',
  UserController.getById
)

router.put(
  '/:userId',
  validateUserInput,
  handleInputErrors,
  UserController.updateById
)

router.delete('/:userId',
  UserController.deleteById
)

export default router