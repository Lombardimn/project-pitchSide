import { ActionStateType } from "@/actions/createAccount.action";

// Función para obtener el error de un campo en particular
export function getFieldError(field: string, errors: ActionStateType["errors"]) {
  return errors.find(error => error.path === field)?.message;
}