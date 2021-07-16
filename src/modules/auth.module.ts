import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Module } from '@nestjs/common';
import { JwtStrategy } from "../strategy/jwt.strategy";
import { AuthService } from "../services/auth.service";
import { UsersModule } from "src/modules/createusers.module";
import { ConfigModule } from "@nestjs/config";
import { envConfig } from "@configs/envConfig";

@Module({
    imports:[
        ConfigModule.forRoot(envConfig()),
        UsersModule,
        JwtStrategy,
        PassportModule,
        JwtModule.register({
            secret: process.env['JWT_SECRET'],
            signOptions: { expiresIn: '60000s' }
        })
    ],
    providers: [AuthService, JwtModule],
    exports: [AuthService],
})
export class AuthModule{}