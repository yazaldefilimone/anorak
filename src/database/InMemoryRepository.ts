import fs from 'fs/promises';
import InMemoryDatabase from './InMemoryDatabase.json';

interface ICreateUserProps {
  name: string;
  password: string;
  number: string;
}
type InMemoryRepositoryProps = typeof InMemoryDatabase;
export class InMemoryRepository {
  private path: string;
  constructor() {
    this.path = __dirname + '/InMemoryDatabase.json';
  }
  private async readFile(): Promise<InMemoryRepositoryProps> {
    const response = await fs.readFile(this.path);
    return JSON.parse(response.toString());
  }
  private async writeFile(data: any) {
    const response = await this.readFile();
    response.users.push(data);
    const Changed = JSON.stringify(response);
    await fs.writeFile(this.path, Changed);
  }

  async createUser({ name, password, number }: ICreateUserProps): Promise<boolean> {
    const data = {
      id: Math.floor(Math.random() * 100000),
      name,
      password,
      number,
    };
    const res = await this.getUsers();
    res.users.push(data);
    await this.writeFile(res);
    return true;
  }
  async getUsers(): Promise<InMemoryRepositoryProps> {
    const result = await this.readFile();
    return result;
  }

  async getMyPerfil() {
    const result = await this.readFile();
    return result.myPerfil;
  }
}
