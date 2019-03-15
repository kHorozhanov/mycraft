import { parse } from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  static get: (key: string) => string;

  private readonly envConfig: {
    [key: string]: string
  };

  constructor(filePath: string) {
    this.envConfig = parse(fs.readFileSync(filePath));
    ConfigService.get = this.get.bind(this)
  }

  get(key: string): string {
    return this.envConfig[key];
  }

}