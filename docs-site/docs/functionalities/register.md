# Registro de Usuario

[![Estado](https://img.shields.io/badge/-Backlog-f7a349?style=social-square&labelColor=f7a349&logo=Ollama&logoColor=black)](//)

[//]: # ( Backlog / #f7a349 | En_proceso / #fff53e | Validando / #6AD9B9 | P_desarrollo / #f1a0f2 | Desarrollado / #1fcb19)

---

## Versión

| Orden   | Versión | Fecha      |Responsable | Descripción           |
|:-------:|:-------:|:-----------|:-----------|:----------------------|
| 1       | 1.0     | 2025-02-03 | [@Lombardimn](https://github.com/Lombardimn) | Documentación inicial |

---

## Índice

- [Descripción de la Funcionalidad](#descripción-de-la-funcionalidad)
- [Prototipo del Frontend](#prototipo-del-frontend)
- [Diagrama de Entidades](#diagrama-de-entidades)
- [Criterios Funcionales](#criterios-funcionales)
  - [Requisitos Obligatorios](#requisitos-obligatorios)
  - [Casos de Uso](#casos-de-uso)
  - [Reglas de Negocio](#reglas-de-negocio)
- [Criterios de Seguridad](#criterios-de-seguridad)
  - [Validaciones de Datos](#validaciones-de-datos)
  - [Protección contra Acciones Malintencionadas](#protección-contra-acciones-malintencionadas)
  - [Otros Aspectos de Seguridad Relevantes](#otros-aspectos-de-seguridad-relevantes)
- [Dependencias](#dependencias)
- [Notas Adicionales](#notas-adicionales-o-comentarios)

## Descripción de la Funcionalidad

_Descripción detallada y de nivel no técnico para stakeholders._

```markdown
La funcionalidad de registro de usuario permite a los usuarios crear una cuenta en la plataforma mediante un formulario de registro simple. 

Al aceptar los terminos y condiciones el usuario debera validar su cuenta con el correo electronico proporcionado. Una vez validado el usuario podra ingresar a la plataforma y disfrutar de todas las funcionalidades disponibles.
```

---

## Prototipo del Frontend

- **Imagen del prototipo:** ![Prototipo](C:\Users\Matias Lombardi\Documents\Proyectos\freelance\project-pitchSide\docs-site\static\img\docusaurus.png)
- **Enlace al prototipo:** [Figma](C:\Users\Matias Lombardi\Documents\Proyectos\freelance\project-pitchSide\docs-site\static\img\docusaurus.png)

---

## Diagrama de Entidades

_Representación visual o lista de entidades con atributos y relaciones._

**Entidades:**

| Nombre   | Atributo     | Obligatoriedad |
|:---------|:-------------|:--------------:|
| user     | Id           | SI             |
| user     | Username     | SI             |
| user     | Email        | SI             |
| user     | Password     | SI             |
| user     | Availability | SI             |

---

## Criterios Funcionales

### Requisitos Obligatorios

| Orden | Criterio |
|:------|:----------|
| 1     | El usuario debe completar un formulario con los siguientes campos obligatorios: nombre, correo electrónico y contraseña. |
| 2     | La contraseña debe cumplir con los requisitos mínimos de seguridad (ej.: al menos 8 caracteres, una mayúscula, un número y un carácter especial). |
| 3     | El usuario debe aceptar los términos y condiciones antes de completar el registro. |
| 4     | Al registrarse, el sistema debe enviar un correo de verificación a la dirección proporcionada. |
| 5     | El usuario no podrá acceder a la plataforma hasta que valide su cuenta mediante el enlace de verificación enviado por correo. |
| 6     | Si el usuario intenta iniciar sesión sin validar su cuenta, el sistema debe mostrar un mensaje indicando que debe verificar su correo. |
| 7     | Los correos electrónicos deben ser únicos en la plataforma; no se permite registrar dos cuentas con la misma dirección de correo. |
| 8     | Si un usuario intenta registrarse con un correo ya existente, el sistema debe mostrar un mensaje de error indicando que la cuenta ya está registrada. |
| 9     | Una vez validado el correo, el usuario podrá acceder a la plataforma con sus credenciales. |
| 10    | El sistema debe registrar la fecha y hora en la que el usuario confirmó su cuenta. |

### Reglas de Negocio

| Orden | Criterio |
|:------|:----------|
| 1     | Un usuario solo puede registrarse si proporciona una dirección de correo electrónico válida y no está previamente registrada en el sistema. |
| 2     | La verificación del correo electrónico es obligatoria para activar la cuenta; sin validación, el usuario no podrá iniciar sesión. |
| 3     | El enlace de verificación enviado al correo electrónico tendrá una validez de 24 horas. Si el usuario no valida su cuenta en ese tiempo, deberá solicitar un nuevo enlace. |
| 4     | Si el usuario olvida su contraseña antes de validar su cuenta, deberá completar primero la verificación por correo antes de poder restablecerla. |
| 5     | En caso de que el usuario intente registrarse con un correo electrónico ya registrado, el sistema deberá sugerirle la opción de recuperar su cuenta en lugar de permitir un nuevo registro. |
| 6     | Si un usuario elimina su cuenta y luego intenta registrarse con el mismo correo, el sistema deberá permitirlo solo si no existen restricciones de seguridad o bloqueos asociados a ese correo. |
| 7     | Un usuario podrá solicitar un nuevo correo de verificación si el enlace original expiró, pero no podrá solicitar más de 3 reenvíos en un lapso de 24 horas. |
| 8     | La plataforma deberá almacenar registros de intentos fallidos de registro (por ejemplo, intentos con correos inválidos o duplicados) para auditoría y posibles medidas de seguridad. |
| 9     | Un usuario que no haya validado su cuenta en un plazo de 7 días será considerado inactivo y podrá ser eliminado automáticamente del sistema tras notificación previa. |
| 10    | El sistema debe garantizar que la validación del correo solo pueda ser utilizada una única vez por cada usuario registrado. |

### Casos de Uso

| Check | Orden | Criterio |
|:------|:-----:|:----------|
| - [ ] | 1     | **Registro exitoso**: Un usuario completa el formulario con datos válidos, acepta los términos y condiciones, recibe el correo de verificación y valida su cuenta correctamente. |
| - [ ] | 2     | **Intento de registro con correo ya registrado**: Un usuario intenta registrarse con un correo electrónico que ya existe en la base de datos. El sistema muestra un mensaje de error y sugiere la opción de recuperar la cuenta. |
| - [ ] | 3     | **Intento de registro con datos inválidos**: Un usuario ingresa datos incorrectos (ej.: correo sin formato válido o contraseña que no cumple los requisitos). El sistema muestra mensajes de error específicos para cada campo. |
| - [ ] | 4     | **Validación de cuenta exitosa**: El usuario accede al enlace de verificación dentro del tiempo permitido y su cuenta se activa correctamente. |
| - [ ] | 5     | **Intento de validación con enlace expirado**: Un usuario intenta validar su cuenta después de que el enlace ha expirado. El sistema muestra un mensaje de error y ofrece la opción de reenviar un nuevo enlace. |
| - [ ] | 6     | **Intento de inicio de sesión sin validar la cuenta**: Un usuario intenta iniciar sesión sin haber validado su correo. El sistema le muestra un mensaje indicando que debe completar la verificación antes de acceder. |
| - [ ] | 7     | **Reenvío de enlace de verificación**: Un usuario solicita un nuevo correo de verificación porque el enlace anterior expiró o no lo recibió. El sistema genera un nuevo enlace y lo envía al correo registrado. |
| - [ ] | 8     | **Intentos fallidos de registro**: Un usuario intenta registrarse varias veces con datos incorrectos o repetidos. El sistema bloquea temporalmente el intento de registro tras varios fallos consecutivos. |
| - [ ] | 9     | **Cuenta inactiva eliminada automáticamente**: Un usuario que no valida su cuenta dentro del período de 7 días recibe una notificación de eliminación. Si no actúa antes del plazo final, su cuenta es eliminada. |
| - [ ] | 10    | **Restablecimiento de contraseña antes de validar cuenta**: Un usuario intenta recuperar su contraseña sin haber validado su correo. El sistema le exige completar la verificación antes de permitir el restablecimiento. |

---

## Dependencias

_Descripción de cómo esta funcionalidad depende de otras._

| Orden | Funcionalidad                | Observaciones                                                                                      |
|:-----:|:-----------------------------|:--------------------------------------------------------------------------------------------------|
| 1     | **Verificación de correo**    | La funcionalidad de registro depende de que el usuario reciba y valide su correo electrónico para completar el proceso de activación de la cuenta. Sin esta validación, no se puede acceder a la plataforma. |
| 2     | **Política de Contraseña**    | El registro de usuario depende de las reglas de complejidad de contraseña. Si el usuario no cumple con los requisitos de seguridad, el sistema no permitirá el registro. |
| 3     | **Términos y Condiciones**    | El registro no puede completarse sin que el usuario acepte los términos y condiciones. Esta validación debe realizarse antes de permitir la creación de la cuenta. |
| 4     | **Autenticación**             | Después de validar el correo, el usuario puede iniciar sesión. La funcionalidad de login depende de que el correo esté validado correctamente. |

---

## Criterios de Seguridad

### Accesos y permisos de usuarios

_Descripción detallada de roles y permisos._

| Orden | Concepto                    | Descripción                                                                                  | Complemento |
|:-----:|:-----------------------------|:--------------------------------------------------------------------------------------------|:------------|
| 1     | **Usuarios no autenticados**  | Solo pueden acceder a la página de registro, inicio de sesión y recuperación de cuenta.     | No tienen acceso a funcionalidades privadas. |
| 2     | **Usuarios registrados**      | Pueden acceder a la plataforma solo después de validar su correo.                          | Hasta que validen su cuenta, no pueden iniciar sesión. |
| 3     | **Validación de correo**      | Un usuario no podrá iniciar sesión hasta haber verificado su correo electrónico.           | Se enviará un enlace de validación al correo registrado. |
| 4     | **Intentos de registro**      | Se limita la cantidad de intentos de registro desde una misma IP para evitar abuso.        | Se puede aplicar un captcha o bloqueo temporal. |
| 5     | **Gestión de cuentas**        | Solo los administradores pueden modificar o eliminar cuentas de usuarios.                  | Los usuarios solo pueden actualizar su propia información. |
| 6     | **Recuperación de cuenta**    | Un usuario puede solicitar un enlace de recuperación si olvidó su contraseña.              | El enlace debe expirar tras un tiempo determinado por seguridad. |
| 7     | **Protección de datos**       | La información del usuario debe estar protegida y no visible para otros sin autorización.   | Aplicar cifrado a contraseñas y datos sensibles. |

### Validaciones de datos

_Validaciones necesarias para garantizar la integridad._

| Orden | Concepto                   | Descripción                                                                 | Complemento |
|:-----:|:----------------------------|:---------------------------------------------------------------------------|:------------|
| 1     | **Formato de correo**       | El correo debe cumplir con un formato válido (ej.: 'usuario@dominio.com').   | Se debe validar tanto en frontend como en backend. |
| 2     | **Contraseña segura**       | Debe contener al menos 8 caracteres, una mayúscula, un número y un símbolo.| Se recomienda el uso de un validador en tiempo real. |
| 3     | **Campos obligatorios**     | No se permite el envío del formulario sin completar los campos requeridos. | Backend debe rechazar solicitudes incompletas. |
| 4     | **Confirmación de contraseña** | Se debe ingresar la contraseña dos veces para evitar errores de tipeo.  | Las contraseñas deben coincidir antes de enviar el formulario. |
| 5     | **Datos duplicados**        | Se debe validar que el correo no haya sido registrado previamente.         | Consultar la base de datos antes de registrar un usuario. |

---

### Protección contra acciones malintencionadas

_Medidas para evitar manipulación de datos y abusos._

| Orden | Concepto                   | Descripción                                                                 | Complemento |
|:-----:|:----------------------------|:---------------------------------------------------------------------------|:------------|
| 1     | **Rate limiting**           | Se debe limitar la cantidad de intentos de registro por IP.                | Evita ataques de fuerza bruta. |
| 2     | **Captcha**                 | Implementar un sistema de captcha si se detectan intentos masivos.         | Puede activarse tras varios intentos fallidos. |
| 3     | **Validación de origen**    | Solo se aceptan solicitudes desde el frontend autorizado.                   | Se debe verificar el referer y el token CSRF. |
| 4     | **Enlace de validación seguro** | El enlace de validación de correo debe expirar tras un tiempo definido. | Se recomienda usar un token de un solo uso con expiración. |
| 5     | **Protección contra inyección** | Validar y sanear todos los datos de entrada para evitar SQL Injection o XSS. | Utilizar ORM y escaping adecuado en todas las consultas. |

---

### Otros aspectos de seguridad relevantes

_Detalles adicionales._

| Orden | Concepto                     | Descripción                                                                | Complemento |
|:-----:|:------------------------------|:---------------------------------------------------------------------------|:------------|
| 1     | **Cifrado de contraseñas**    | Las contraseñas deben ser almacenadas de forma segura usando hashing (ej.: bcrypt). | Nunca almacenar contraseñas en texto plano. |
| 2     | **Autenticación segura**      | Usar tokens de autenticación seguros como JWT con expiración controlada.   | Implementar refresh tokens para mantener sesiones activas. |
| 3     | **Política de seguridad en correos** | Evitar exponer información sensible en los correos de validación. | No incluir la contraseña del usuario en los correos. |
| 4     | **Logs de actividad**         | Registrar intentos de registro sospechosos para su análisis.                | Permitir a los administradores revisar estos eventos. |

---

## Notas Adicionales o Comentarios

_Comentarios adicionales sobre la funcionalidad._

- Se debe evaluar si en el futuro se permitirá el registro con redes sociales.
- La política de expiración del enlace de validación aún está por definir.
- Se debe evaluar si se necesita una mejora relacionado con mejoras en la validación del correo electrónico.

- **Issue relacionada:** [Enlace al Issue](URL_DEL_ISSUE)

| Orden | Nota | Issue |
|:-----:|:-----|:-----:|
| 1     | N/A  | -     |

---