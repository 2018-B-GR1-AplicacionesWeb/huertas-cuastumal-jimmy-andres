import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {NoticiaService} from "./noticia/noticia.service";

import {TypeOrmModule} from '@nestjs/typeorm';
import {NoticiaEntity} from "./noticia/noticia-entity";
import {NoticiaModule} from "./noticia/noticia.module";
import {PaginaEntity} from "./pagina/pagina.entity";
import {ArticuloEntity} from "./articulo/articulo.entity";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(
            {
                type: 'mysql',
                host: 'localhost',
                port: 32771 ,
                database: 'noticias',
                username: 'andreshcl',
                password: '12345',
                synchronize: true,
                dropSchema: false,
                entities: [
                    NoticiaEntity,
                    PaginaEntity,
                    ArticuloEntity,
                    UsuarioEntity
                ]
            }
        ),
        NoticiaModule,
        UsuarioModule
    ],  // MODULOS
    controllers: [
        AppController
    ],  // Controllers
    providers: [
        AppService
    ], // Servicios
})
export class AppModule {
}