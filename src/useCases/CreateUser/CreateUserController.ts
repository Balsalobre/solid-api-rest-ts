import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {

    constructor(private createUserCase: CreateUserUseCase) {
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        try {
            await this.createUserCase.execute({ name, email, password });
            return response.status(201).send();
        } catch(e: any) {
            const status = e && typeof e === 'object' && 'statusCode' in e ? e.statusCode : 400;
            return response.status(status).json({
                message: e instanceof Error ? e.message : 'Unexpected error.'
            });
        }
    }
}
