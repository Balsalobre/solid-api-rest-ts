class AppError extends Error {
    public readonly statusCode: number;
    constructor(message: string, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ICreateUserRequestDTO } from "./CreateUserDTO"
import { Config } from "../../config/Config";

export class CreateUserUseCase {

    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateUserRequestDTO) {
                const userAlreadyExist = await this.usersRepository.findByEmail(data.email);
                if(userAlreadyExist) {
                        throw new AppError('El usuario ya existe.', 409);
                }
                let user: User;
                try {
                    user = new User(data);
                } catch (err) {
                    throw new AppError(err instanceof Error ? err.message : 'Datos de usuario inválidos', 400);
                }
                await this.usersRepository.save(user);
                await this.mailProvider.sendMail({
                        to: {
                                name: data.name,
                                email: data.email,
                        },
                        from: {
                                name: Config.FROM_NAME,
                                email: Config.FROM_EMAIL,
                        },
                        subject: 'Bienvenido a la plataforma',
                        body: '<p>Ya puede realizar login en nuestra plataforma</p>'
                });
    }
}
