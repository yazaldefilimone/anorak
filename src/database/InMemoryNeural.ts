import fs from 'fs/promises';
// import InMemoryNeural from './Neural.json';

interface ICreateNeuralProps {
  type: string;
  mensagem: string;
  response: string;
}
// type InMemoryNeuralRepositoryProps = typeof InMemoryNeural;
export class InMemoryNeuralRepository {
  private path: string;
  constructor() {
    this.path = __dirname + '/Neural.json';
  }
  private async readFile(): Promise<any> {
    const response = await fs.readFile(this.path);
    return JSON.parse(response.toString());
  }
  private async writeFile(data: any) {
    const response = await this.readFile();
    response.push(data);
    const Changed = JSON.stringify(response);
    await fs.writeFile(this.path, Changed);
  }

  async createNeural({ type, mensagem, response }: ICreateNeuralProps): Promise<boolean> {
    const data = {
      type,
      mensagem,
      response,
    };
    // const res = await this.getNeural();

    await this.writeFile(data);
    return true;
  }
  async getNeural(): Promise<any> {
    const result = await this.readFile();
    return result;
  }
}
