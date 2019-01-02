import {Column} from "typeorm";

export class NoticiaEntity {
    @Column()
    titulo:string;
    @Column()
    descripcion:string;

}