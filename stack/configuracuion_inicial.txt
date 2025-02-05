¡Perfecto! Vamos a configurar la estructura base para este proyecto. Iniciaremos con la configuración del **frontend**, **backend**, y la conexión con la **base de datos**. Te guiaré paso a paso.

---

### **Configuración del Proyecto**
#### **1. Estructura del repositorio**
Organizaremos el proyecto de esta forma en GitHub:

```
project-name/
├── client/       # Frontend
├── server/       # Backend
├── README.md     # Documentación inicial
├── .gitignore    # Archivos a ignorar por git
```

---

#### **2. Configuración del Frontend (`client`)**
**Paso 1:** Crear el proyecto con Vite + React + TypeScript.  
```bash
# Desde la carpeta raíz del proyecto:
cd project-name
npm create vite@latest client -- --template react-ts
cd client
npm install
```

**Paso 2:** Instalar las dependencias necesarias:  
```bash
npm install react-query react-hook-form @tanstack/react-query tailwindcss postcss autoprefixer framer-motion axios
```

**Paso 3:** Configurar Tailwind CSS:  
```bash
npx tailwindcss init -p
```

Actualizar `tailwind.config.cjs`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

En `src/index.css`, agregar lo siguiente:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

#### **3. Configuración del Backend (`server`)**
**Paso 1:** Crear la carpeta `server` y configurar un proyecto con Node.js + TypeScript:  
```bash
cd ../
mkdir server && cd server
npm init -y
npm install express dotenv cors body-parser jsonwebtoken bcryptjs
npm install --save-dev typescript ts-node @types/node @types/express @types/cors
```

**Paso 2:** Configurar TypeScript:  
```bash
npx tsc --init
```

Modificar `tsconfig.json` para permitir módulos modernos:
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

**Paso 3:** Crear la estructura inicial del backend:
```bash
mkdir src
mkdir src/routes src/controllers src/models src/middleware src/config
```

Estructura sugerida:
```
server/
├── src/
│   ├── config/          # Configuración (base de datos, variables de entorno)
│   ├── controllers/     # Lógica de las rutas
│   ├── middleware/      # Middleware (auth, validaciones)
│   ├── models/          # Modelos (ORM)
│   ├── routes/          # Rutas de la API
│   ├── server.ts        # Punto de entrada del backend
├── tsconfig.json
├── package.json
```

**Paso 4:** Configurar `server.ts` para levantar el servidor:
```typescript
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

#### **4. Configuración de la base de datos**
Vamos a usar PostgreSQL con **Prisma**.

**Paso 1:** Instalar Prisma y su CLI:  
```bash
npm install prisma --save-dev
npx prisma init
```

Esto generará una carpeta `prisma/` con un archivo `schema.prisma`.

**Paso 2:** Modificar `schema.prisma` para reflejar las entidades iniciales:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  teams     Team[]
}

model Team {
  id          Int      @id @default(autoincrement())
  name        String
  description String
  createdAt   DateTime @default(now())
  members     User[]
}
```

**Paso 3:** Configurar la conexión a la base de datos:  
En `.env`, agrega:
```
DATABASE_URL=postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DB_NAME>
```

**Paso 4:** Migrar la base de datos y generar el cliente de Prisma:  
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

#### **5. Configuración de las Rutas de la API**
Crea un archivo en `src/routes/userRoutes.ts`:
```typescript
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("User API is working");
});

export default router;
```

Conéctalo en `server.ts`:
```typescript
import userRoutes from "./routes/userRoutes";

app.use("/api/users", userRoutes);
```

---

### **6. Conexión Frontend-Backend**
En el frontend, utiliza **Axios** para realizar solicitudes al backend:
```bash
npm install axios
```

Crea un cliente API en `src/utils/apiClient.tsx`:
```typescript
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default apiClient;
```

---

### **7. Despliegue**
1. **Frontend:** Usa **Netlify** o **Vercel** para desplegar el cliente.  
2. **Backend y DB:** Usa **Railway.app** o **Render.com** para el backend y PostgreSQL.

---

¿Te gustaría que configuremos más detalles, como la autenticación o los modelos específicos para encuentros? 🚀