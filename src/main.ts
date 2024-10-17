import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const child_process = require('child_process');

  await app.listen(process.env.PORT ?? 3000);

  if (process.env.NODE_ENV === 'development') {
    const DEV_SERVER_PORT = process.env.DEV_SERVER_PORT || 4200;

    const child = child_process.exec(
      `cd ./ui; ng serve --port=${DEV_SERVER_PORT} --proxy-config proxy.conf.json`,
    );
    child.stderr.on('data', (err) => console.error(err.toString()));
    child.stdout.on('data', (data) => console.log(data.toString()));
  }
}
bootstrap();
