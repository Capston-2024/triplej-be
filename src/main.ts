import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // 프론트엔드 URL
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: true, // 인증 정보 포함 (쿠키 등)
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
