import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Carlos Eduardo SEGUNDA PRUEBA!';
  }
}
