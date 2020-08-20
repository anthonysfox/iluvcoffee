import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Below are all example of how you could apply the middleware
    consumer.apply(LoggingMiddleware).forRoutes('*');
    // consumer.apply(LoggingMiddleware).forRoutes('coffees');
    // consumer
    //   .apply(LoggingMiddleware)
    //   .forRoutes({ path: 'coffees', method: RequestMethod.GET });
    // To exclude a route you can do
    // consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*')
  }
}
