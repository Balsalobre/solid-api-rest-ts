import { Router } from "express";
import { createUserController } from "./useCases/CreateUser";
import { validateCreateUser } from "./middlewares/validateCreateUser";

const router = Router();

router.post('/users', validateCreateUser, (request, response) =>  createUserController.handle(request, response));

export { router };
