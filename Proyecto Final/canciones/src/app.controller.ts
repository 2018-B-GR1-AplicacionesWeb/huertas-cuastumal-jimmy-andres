import {Body, Controller, Get, HttpCode, Post, Res, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private readonly _usuarioService: UsuarioService) {

    }

    @Get('adiosMundo') // url
    adiosMundo(): string {
        return 'Adios mundo'
    }
    @Get('login')
    mostrarLogin(
        @Res() res
    ){
        res.render('login')
    }

    @Post('login')
    @HttpCode(200)
    async ejecutarLogin(
        @Body('username') username:string,
        @Body('password') password:string,
        @Res() res
    ){
        const respuesta = await this._usuarioService
            .autenticar(username, password);

        if(respuesta){
            res.send('ok');
            //res.redirect('adiosMundo')
        }else{
            res.redirect('login');
        }
    }
}
