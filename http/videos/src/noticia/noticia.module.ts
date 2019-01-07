import {Module} from "@nestjs/common";
import {NoticiaService} from "./noticia.service";
import {NoticiaController} from "./noticia.controller";
import {TypeOrmModule} from '@nestjs/typeorm'
import {NoticiaEntity} from "./noticia-entity";

@Module(
    {
        imports:[
            TypeOrmModule
                .forFeature(
                    [
                    NoticiaEntity
                    ])
        ],
        controllers:[
            NoticiaController
        ],
        providers:[
            NoticiaService
        ],
        exports:[
            //Servicios o Modulos
            NoticiaService
        ]
    }
)
export class NoticiaModule {

}