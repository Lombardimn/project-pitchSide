# Proyecto PitchSide - Base de Datos

Este proyecto utiliza una base de datos gestionada por el ORM Prisma y se conecta a una base de datos PostgreSQL.

## Tecnologías Utilizadas

- **Prisma**: Un ORM (Object-Relational Mapping) que facilita la interacción con la base de datos de una manera más intuitiva y eficiente.
- **PostgreSQL**: Un sistema de gestión de bases de datos relacional, conocido por su robustez y rendimiento.

## Configuración

1. **Instalación de dependencias**:
  ```bash
  npm install @prisma/client
  ```

2. **Configuración de Prisma**:
  Inicializa Prisma en tu proyecto:
  ```bash
  npx prisma init
  ```

3. **Configuración de la base de datos**:
  En el archivo `.env`, configura la URL de conexión a tu base de datos PostgreSQL:
  ```
  DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_de_datos"
  ```

4. **Migraciones**:
  Crea y aplica migraciones para mantener tu esquema de base de datos actualizado:
  ```bash
  npx prisma migrate dev --name init
  ```

## Uso

Para interactuar con la base de datos, puedes utilizar Prisma Client en tu código:
```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Ejemplo de consulta
  const usuarios = await prisma.usuario.findMany();
  console.log(usuarios);
}

main()
  .catch(e => {
   throw e;
  })
  .finally(async () => {
   await prisma.$disconnect();
  });
```

## Documentación

Para más información, consulta la documentación oficial de [Prisma](https://www.prisma.io/docs/) y [PostgreSQL](https://www.postgresql.org/docs/).
