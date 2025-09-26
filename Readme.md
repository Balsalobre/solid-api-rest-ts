# API REST con Principios SOLID

Este proyecto implementa una API REST siguiendo los principios SOLID (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, y Dependency Inversion).

## Características

- ✅ Arquitectura basada en principios SOLID
- ✅ Dependency Injection
- ✅ Repository Pattern
- ✅ Use Cases (Clean Architecture)
- ✅ Variables de entorno con configuración centralizada
- ✅ TypeScript con tipado estricto
- ✅ ESLint y Prettier configurados

## Estructura del Proyecto

```
src/
├── app.ts                      # Configuración principal de Express
├── server.ts                   # Punto de entrada del servidor
├── routes.ts                   # Definición de rutas
├── config/
│   └── Config.ts               # Configuración centralizada y variables de entorno
├── entities/
│   └── User.ts                 # Entidad Usuario
├── middlewares/
│   └── validateCreateUser.ts    # Middleware de validación para creación de usuario
├── repositories/
│   ├── IUsersRepository.ts      # Interfaz del repositorio de usuarios
│   └── implementations/
│       └── PostgresUsersRepository.ts  # Implementación PostgreSQL (fake)
├── providers/
│   ├── IMailProvider.ts         # Interfaz del proveedor de email
│   └── implementations/
│       ├── MailtrapMailProvider.ts     # Implementación de Mailtrap para envío de emails
│       └── PostgresUsersRepository.ts  # Implementación de repositorio de usuarios (duplicada para ejemplo)
└── useCases/
   └── CreateUser/
      ├── CreateUserController.ts     # Controlador para crear usuario
      ├── CreateUserDTO.ts           # Data Transfer Object
      ├── CreateUserUseCase.ts       # Lógica de negocio
      ├── CreateUserUseCase.test.ts  # Tests unitarios (Bun)
      └── index.ts                   # Configuración de dependencias
```

## Configuración

### Variables de Entorno

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```

2. Edita las variables en `.env`:
   ```env
   # Server Configuration
   PORT=3334

   # Mail Configuration
   MAIL_HOST=smtp.mailtrap.io
   MAIL_PORT=2525
   MAIL_USER=your_mailtrap_user
   MAIL_PASS=your_mailtrap_password

   # Application Configuration
   APP_NAME=SOLID API
   FROM_EMAIL=noreply@solidapi.com
   FROM_NAME=SOLID API Team
   ```

## Instalación y Uso

1. Instala las dependencias:
   ```bash
   bun install
   ```

2. Configura las variables de entorno (ver sección anterior)

3. Ejecuta el servidor en modo desarrollo:
   ```bash
   bun run dev
   ```

4. El servidor estará disponible en `http://localhost:PORT`

## Probar la API con REST Client

Puedes probar los endpoints de la API directamente desde VS Code usando la extensión [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). Solo necesitas crear un archivo `.http` o `.rest` con las peticiones y ejecutarlas desde el editor.

Ejemplo de petición:

```http
POST http://localhost:3334/users
Content-Type: application/json

{
   "name": "John Doe",
   "email": "john@example.com",
   "password": "password123"
}
```

---

- `bun run start` - Ejecuta el servidor
- `bun run dev` - Ejecuta el servidor en modo desarrollo con watch
- `bun run build` - Construye el proyecto para producción
- `bun run start:prod` - Ejecuta la versión de producción
- `bun run lint` - Ejecuta ESLint
- `bun run lint:fix` - Ejecuta ESLint y arregla errores automáticamente
- `bun run format` - Formatea el código con Prettier
- `bun run format:check` - Verifica el formato del código
- `bun test` - Ejecuta los tests unitarios

## Principios SOLID Aplicados

1. **Single Responsibility Principle (SRP)**: Cada clase tiene una única responsabilidad
2. **Open/Closed Principle (OCP)**: El código está abierto para extensión pero cerrado para modificación
3. **Liskov Substitution Principle (LSP)**: Las implementaciones pueden ser intercambiables
4. **Interface Segregation Principle (ISP)**: Interfaces específicas y cohesivas
5. **Dependency Inversion Principle (DIP)**: Dependencias abstraídas mediante interfaces
