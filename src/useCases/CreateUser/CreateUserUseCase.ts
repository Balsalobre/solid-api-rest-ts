import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ICreateUserRequestDTO } from "./CreateUserDTO"

export class CreateUserUseCase {
     
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExist = await this.usersRepository.findByEmail(data.email);

        if(userAlreadyExist) {
            throw new Error('User already exist.');
        }
        
        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'contacto de mi empresa',
                email: 'mynegocioweb@myweb.com',
            },
            subject: 'Bienvenido a la plataforma',
            body: '<p>Ya puede realizar login en nuestra plataforma</p>'
        })
    }
}