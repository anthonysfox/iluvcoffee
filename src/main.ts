import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

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
  await app.listen(3000);
}
bootstrap();
