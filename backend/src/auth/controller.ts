import { Get, Controller, Req, Res, HttpStatus, HttpCode, Query } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get("start")
  @HttpCode(HttpStatus.OK)
  async startAuth(@Res() res: Response) {
    const authURL = this.authService.getLinkedInAuthorizationURL()

    return res.send({ authURL })
  }

  // auth.controller.ts
  @Get('callback/linkedin')
  async callback(@Query('code') code: string, @Res() res: Response) {
    // 1. Service troca code por user/token
    const authPayload = await this.authService.handleLinkedInCallback(code);

    // 2. Construímos o payload para enviar ao frontend
    const payload = {
      status: 'success',
      ...authPayload
    };

    // 3. Renderizamos um HTML com Script para Cross-Window Communication
    // Isso é seguro pois window.opener só é acessível se estivermos no mesmo domínio ou se configurado explicitamente.
    const htmlScript = `
    <html>
      <body>
        <script>
          // Envia os dados para a janela que abriu este popup
          // '*' permite qualquer origem, em prod use 'http://seu-frontend.com' para segurança extra
          window.opener.postMessage(${JSON.stringify(payload)}, '*');
          
          // Fecha o popup
          window.close();
        </script>
        <p>Autenticação concluída. Fechando...</p>
      </body>
    </html>
  `;

    res.send(htmlScript);
  }
}
