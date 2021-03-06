import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class PostgresUsersRepository implements IUsersRepository {
    
    private user: User[] = [];

    async findByEmail(email: string): Promise<User> {
        const user = this.user.find(user => user.email === email);
        return user;
    }

    async save(user: User): Promise<void> {
        this.user = [ ...this.user, user];
    }
}