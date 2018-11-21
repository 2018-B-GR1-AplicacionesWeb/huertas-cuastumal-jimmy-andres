import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//const http_server = require('http-server) //js

import * as cookieParser from 'cookie-parser';
import * as httpserver from 'http-server';
console.log(httpserver);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('me gustan los tacos', //secreto
      {
        //opciones
      })
  );
  await app.listen(2000);
}
bootstrap();
