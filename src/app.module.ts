import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { IamModule } from './iam/iam.module';

@Module({
  imports: [AuthModule, BooksModule, IamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
