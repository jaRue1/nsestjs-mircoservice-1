//  Used to mostly to interact with db
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Run!';
  }
}
