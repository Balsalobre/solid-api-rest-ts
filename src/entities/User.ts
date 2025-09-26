import { randomUUID } from 'crypto';


export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;

  constructor(props: { name: string; email: string; password: string }, id?: string) {
    if (!props.name || props.name.trim().length < 2) {
      throw new Error('El nombre es obligatorio y debe tener al menos 2 caracteres.');
    }
    if (!props.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(props.email)) {
      throw new Error('El email es obligatorio y debe ser válido.');
    }
    if (!props.password || props.password.length < 6) {
      throw new Error('La contraseña es obligatoria y debe tener al menos 6 caracteres.');
    }
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.id = id ?? randomUUID();
  }
}
