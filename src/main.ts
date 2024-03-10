import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

// написать в инструкции чтобы env файл создали
// в схеме Favorites указывают на реф
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}
bootstrap();
