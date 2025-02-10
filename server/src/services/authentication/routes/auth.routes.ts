import { Router } from "express"
import { SingUp, SingIn, LogOut } from "../controllers/auth.controller"
import { validatedSchema } from "../../../middleware/schema.middleware"
import { singUpSchema } from "../schemas/auth.schema"

const router = Router()

router.post(
  '/register',
  validatedSchema(singUpSchema),
  SingUp
)

router.post(
  '/login',
  SingIn
)

router.post(
  '/logout',
  LogOut
)

export default router