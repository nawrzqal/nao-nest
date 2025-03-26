import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Ninja API')
    .setDescription('The ninja API description')
    .setVersion('1.0')
    .addTag('ninjas')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
