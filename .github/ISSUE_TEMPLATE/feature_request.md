---
name: 🚀 Nueva Funcionalidad
about: Solicitud para agregar una nueva funcionalidad o mejora
title: "[FEATURE] "
labels: ["feature", "backend"]
assignees: ""
---

## 📌 Descripción  
<!-- Explica brevemente qué funcionalidad se va a desarrollar y su propósito -->  
Crear el modelo de usuarios en la base de datos para almacenar la información necesaria de cada jugador.

### 📊 **Atributos del modelo de usuarios**  
- **Nombre**  
- **Edad**  
- **Posición**  
- **Subtipo de posición**  
- **Posición alternativa**  
- **Subtipo de posición alternativa**  
- **Contraseña** _(encriptada con bcrypt)_  
- **Valoración inicial del usuario** _(0 por defecto)_  

---

## ✅ **Criterios de Aceptación**  
- [ ] El modelo debe seguir la estructura del **DER propuesto**.  
- [ ] La **contraseña debe almacenarse de forma segura** usando bcrypt.  
- [ ] Validar que el **correo sea único** en la base de datos.  

---

## 🛠️ **Tareas Técnicas**  
- [ ] Diseñar el esquema en **PostgreSQL**.  
- [ ] Implementar el modelo en el servidor (**Node.js + TypeORM/Prisma**).  
- [ ] Crear validaciones para los **datos requeridos**.  
- [ ] Probar con **datos de prueba** en el entorno local.  

---

## 🔗 **Referencias**  
📌 _Adjuntar aquí enlaces a documentación relevante, DER, o especificaciones adicionales_  

📷 **Capturas (Opcional)**  
_Añadir capturas del DER o prototipos si están disponibles._  

---

## ⏳ **Notas Adicionales**  
🔹 _Cualquier información extra o posibles dependencias con otras funcionalidades_  
