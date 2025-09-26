import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class PostgresUsersRepository implements IUsersRepository {
  private user: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.user.find(user => user.email === email);
  }

  async save(user: User): Promise<void> {
    this.user = [...this.user, user];
  }
}
