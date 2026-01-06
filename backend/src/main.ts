import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    {
      bodyParser: false,
      cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
        methods: ["*"],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        preflightContinue: true
      }
    }
  );
  await app.listen(3000);
}
bootstrap();
