import { SingUp, SingIn, LogOut, Verify } from "../controllers/auth.controller"
import { validatedSchema } from "../../../middleware/schema.middleware"
import { singUpSchema } from "../schemas/auth.schema"
import { Router } from "express"

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

router.get(
  '/verification',
  Verify
)

export default router