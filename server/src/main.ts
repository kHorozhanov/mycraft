import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useStaticAssets(join(__dirname, '../public/uploads'), {
    prefix: 'uploads',
    immutable: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    validationError: {
      value: false,
      target: false,
    },
  }));

  const options = new DocumentBuilder()
    .setTitle('Flora API')
    .setDescription('The spa API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .setBasePath('api')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);


  await app.listen(process.env.PORT || 3000);
}

bootstrap();
