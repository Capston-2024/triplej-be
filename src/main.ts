import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // 프론트엔드 URL
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS',
    credentials: true, // 인증 정보 포함 (쿠키 등)
  });

  //Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Pickin\' API') // 문서 제목
    .setDescription('Pickin\' API Description') // 설명
    .setVersion('1.0') // 버전
    .addTag('Auth') // 태그
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
