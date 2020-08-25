import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptor/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adds ability for validation of request bodies
  // whitelist excludes any properties on the body that are not included in the dto. used to prevent malicious data
  // forbidNonWhitelisted throws an error and stop the request from ebing processed if there is a property that shouldnt be there
  // transform makes incoming body an instance of the dto
  // transform to change input to a primative type slightly impacts performance
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Custom exception handler
  // app.useGlobalFilters(new HttpExceptionFilter());

  // example of using a guard globally
  // would most likely put it above routes that need to be protected
  // app.useGlobalGuards(new ApiKeyGuard());

  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );

  const options = new DocumentBuilder()
    .setTitle('Iluvcoffee')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
