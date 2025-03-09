
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config/services';


@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ){}    
    
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if( !token ){
            throw new UnauthorizedException("No se encontro una cuenta")
        }

        try {
            const { user, token: validateToken } = await firstValueFrom(this.client.send('auth.user.verify', token))

            request.user = user;
            request.token = validateToken;
        } catch (error) {
            throw new RpcException(error)
        }

        return true
    }


    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === "Bearer" ? token : undefined;
    }
}