import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // below overrides a method if it times out and throws an error
    return next.handle().pipe(
      timeout(3000),
      catchError(err => {
        // catch error gets all errors that occur in the stream
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }

        return throwError(err);
      }),
    );
  }
}
