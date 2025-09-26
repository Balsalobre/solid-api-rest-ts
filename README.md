# 🚀 SOLID API REST con TypeScript

API REST de ejemplo construida con Node.js, Express y TypeScript, aplicando los principios SOLID de manera práctica y sencilla. Ideal para aprender buenas prácticas de arquitectura y compartir en redes.

---

## 📝 Descripción
Este proyecto es una API REST básica para la gestión de usuarios, donde cada capa y componente sigue los principios SOLID. Incluye validación, envío de emails y una estructura escalable y mantenible.

---

## 🧩 Principios SOLID aplicados

### 1. **Single Responsibility Principle (SRP)**
Cada clase y archivo tiene una única responsabilidad:
- `User.ts`: solo representa la entidad usuario.
- `CreateUserUseCase.ts`: solo contiene la lógica de negocio para crear usuarios.
- `MailtrapMailProvider.ts` y `PostgresUsersRepository.ts`: cada uno se encarga de una infraestructura específica.

### 2. **Open/Closed Principle (OCP)**
Las clases están abiertas a extensión pero cerradas a modificación. Por ejemplo, puedes añadir nuevos proveedores de email o repositorios sin modificar la lógica de negocio.

### 3. **Liskov Substitution Principle (LSP)**
Las implementaciones (`MailtrapMailProvider`, `PostgresUsersRepository`) pueden sustituir a sus interfaces (`IMailProvider`, `IUsersRepository`) sin romper la aplicación.

### 4. **Interface Segregation Principle (ISP)**
Las interfaces (`IMailProvider`, `IUsersRepository`) son pequeñas y específicas, evitando métodos innecesarios.

### 5. **Dependency Inversion Principle (DIP)**
La lógica de negocio (`CreateUserUseCase`) depende de abstracciones (interfaces), no de implementaciones concretas. Las dependencias se inyectan desde fuera.

---

## 📦 Estructura del proyecto

```
src/
  app.ts                # Configuración de Express
  routes.ts             # Definición de rutas
  server.ts             # Arranque del servidor
  config/Config.ts      # Configuración y variables de entorno
  entities/User.ts      # Entidad Usuario
  middlewares/          # Middlewares de validación
  providers/            # Proveedores de servicios (email, repositorios)
  repositories/         # Interfaces y repositorios de usuarios
  useCases/CreateUser/  # Caso de uso para crear usuario
```

---

## 🛠️ Scripts disponibles

- `dev`: Arranca el servidor en modo desarrollo con recarga automática.
- `start`: Arranca el servidor en modo producción.
- `build`: Compila el proyecto a JavaScript en la carpeta `dist`.
- `test`: Ejecuta los tests.
- `lint`: Linting de código con ESLint.
- `lint:fix`: Linting y auto-fix.
- `format`: Formatea el código con Prettier.
- `format:check`: Verifica el formato del código.

Ejemplo:
```bash
bun run dev
```

---

## 📋 Ejemplo de uso de la API

### Crear usuario
```http
POST /users
Content-Type: application/json
{
  "name": "Ada Lovelace",
  "email": "ada@lovelace.com",
  "password": "123456"
}
```

---

## 🌱 ¿Por qué SOLID?
Aplicar SOLID desde el inicio permite que tu código sea más mantenible, escalable y fácil de testear. Este proyecto es un punto de partida para proyectos profesionales.

---

## 📣 Autor
- [@cbalsalobre](https://github.com/cbalsalobre)

---

¡Si te ha gustado, compártelo y dale una estrella! ⭐
