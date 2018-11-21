import {Get,
    Controller,
    HttpCode,
    InternalServerErrorException,
    Post,
    Query,
    Param,
    Body,
    Headers,
    UnauthorizedException,
    Res,
    Req} from '@nestjs/common';
import {AppService} from './app.service';
import {Observable, of} from "rxjs";
import {Request, Response} from 'express';

@Controller()  //decoradores
//Controller('usuario')
//h
export class AppController {
    constructor(private readonly _appService: AppService) { //Se puede poner mas servicion ahi mismo

    }

    @Get() // http://ip:puerto
    //@HttpCode(204) // status
    raiz(
        @Query() todosQueryParams: any,
        @Query('nombre') nombre: string,
    ): string {
        console.log(todosQueryParams);
        return 'Hola Mundo '+ nombre;
    }

    @Get('segmentoUno/segmentoDos/:idUsuario')
    parametroRuta(
        @Param('idUsuario') id

    ){
        return id;
    }

    @Get('adiosMundo') // url
    adiosMundo(): string {
        return 'Adios Mundo';
    }
    @Post('adiosMundoPost') // url
    adiosMundoPost(): string {
        return 'Adios MundoPost';
    }

    @Get('adiosMundoPromesa') // url
    adiosMundoPromesa(): Promise<string> {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve) => {
                    resolve('Adios Mundo');
                }
            )
        };
        return promesaAdios();
    }


    @Get('adiosMundoAsync') // url
    @HttpCode(201)
    async adiosMundoAsync() {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve, reject) => {
                    reject('Adios Mundo');
                }
            )
        };
        try {
            const respuesta: string = await promesaAdios();
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje: 'Error servidor'})
        }

    }

    @Get('adiosMundoObservable')
    adiosMundoObservable():Observable<string>{
      const respuesta$ =of('Adios Mundo');
      return respuesta$;
    }

    @Post('crearUsuario')
    crearUsuario(
        @Body() usuario: Usuario,
        @Body('nombre') nombre:string,
        @Headers() cabeceras,//cabeceras de peticion
        @Headers('seguridad') codigo,
        @Res()  res: Response,
        @Req() req: Request,
    ){
        //crean usuario
        console.log('cookies',req.cookies); // LEIDO
        console.log('cookies seguras',req.signedCookies); // LEIDO
        console.log(usuario);
        console.log(cabeceras);

        if (codigo === '1234') {
            const bdd = this._appService.crearUsuario(usuario);

            res.append('token','5678');
            res.cookie("app","web"); //Insegura  //enviar cookies inseguras
            res.cookie("segura","essecreto",{
                signed: true,
            });
            res.json(bdd);
        }else{
            throw new UnauthorizedException({
                mensaje: 'Error de autorizacion',
                error: 401
            })
        }

    }

}

   export interface Usuario {
    nombre: string;
    }