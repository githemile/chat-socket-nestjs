import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat/chat.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    type : 'postgres',
    host : 'localhost',
    port : 5432,
    username : 'postgres',
    password : 'postgres',
    database : 'Chat',
    entities : [Chat],
    synchronize : true
  }), 
  TypeOrmModule.forFeature([Chat]),
  
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
