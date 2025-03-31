import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { RatesModule } from './rates/rates.module';
import { CommentsModule } from './comments/comments.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-api'),
    AuthModule,
    ConfigModule.forRoot({isGlobal: true}),
    // NinjasModule, 
    UsersModule,
    PostsModule,
    CategoriesModule,
    RatesModule,
    CommentsModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
