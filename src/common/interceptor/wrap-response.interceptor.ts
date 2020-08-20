import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    // this can format the response of the data that comes back from the observable
    // So for below the data that is return from the database will be wrapped in data: {}
    return next.handle().pipe(map(data => ({ data })));
  }
}
