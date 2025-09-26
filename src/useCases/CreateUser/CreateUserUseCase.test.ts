import { CreateUserUseCase } from "./CreateUserUseCase";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IMailProvider, IMessage } from "../../providers/IMailProvider";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];
  async findByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }
  async save(user: User) {
    this.users.push(user);
  }
}

class FakeMailProvider implements IMailProvider {
  public sent: IMessage[] = [];
  async sendMail(message: IMessage) {
    this.sent.push(message);
  }
}

describe('CreateUserUseCase', () => {
  let usersRepository: FakeUsersRepository;
  let mailProvider: FakeMailProvider;
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    mailProvider = new FakeMailProvider();
    useCase = new CreateUserUseCase(usersRepository, mailProvider);
  });

  it('crea un usuario válido y envía email', async () => {
    const data: ICreateUserRequestDTO = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    await useCase.execute(data);
    const user = await usersRepository.findByEmail(data.email);
    expect(user).toBeDefined();
    expect(user?.name).toBe(data.name);
    expect(mailProvider.sent.length).toBe(1);
    expect(mailProvider.sent[0].to.email).toBe(data.email);
  });

  it('no permite crear usuario duplicado', async () => {
    const data: ICreateUserRequestDTO = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    await useCase.execute(data);
    await expect(useCase.execute(data)).rejects.toThrow('El usuario ya existe.');
  });

  it('valida nombre requerido', async () => {
    const data = { name: '', email: 'a@b.com', password: 'password123' };
    await expect(useCase.execute(data)).rejects.toThrow('El nombre es obligatorio');
  });

  it('valida email requerido y formato', async () => {
    const data = { name: 'Test', email: 'bademail', password: 'password123' };
    await expect(useCase.execute(data)).rejects.toThrow('El email es obligatorio');
  });

  it('valida contraseña requerida y longitud', async () => {
    const data = { name: 'Test', email: 'a@b.com', password: '123' };
    await expect(useCase.execute(data)).rejects.toThrow('La contraseña es obligatoria');
  });
});
