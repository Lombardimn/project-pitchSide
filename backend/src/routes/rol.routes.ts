import { Router } from "express"
import { RolController } from "../controllers/rol.controller"
import { validateRolExists, validateRolId, validateRolInput } from "../middleware/rol.middleware"
import { handleInputErrors } from "../middleware/validation.middleware"


const router = Router()

router.param('rolId', validateRolId)
router.param('rolId', validateRolExists)

router.get(
  '/',
  RolController.getAll
)

router.post(
  '/',
  validateRolInput,
  handleInputErrors,
  RolController.create
)

router.get(
  '/:rolId',
  RolController.getById
)

router.put(
  '/:rolId',
  validateRolInput,
  handleInputErrors,
  RolController.updateById
)

router.delete(
  '/:rolId',
  RolController.deleteById
)

export default router