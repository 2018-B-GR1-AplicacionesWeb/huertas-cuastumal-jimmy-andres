import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {NoticiaService} from "./noticia.service";
import {TypeOrmModule} from '@nestjs/typeorm'


@Module({
    imports: [
        TypeOrmModule.forRoot(
            {
                type:'mysql',
                host:'localhost',
                port: 32773,
                database:'noticias',
                username: 'andreshcl',
                password: '12345'
            }
        )
    ],  // MODULOS
    controllers: [AppController],  // Controllers
    providers: [
        AppService,
        NoticiaService
    ], // Servicios
})
export class AppModule {
}