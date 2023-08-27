import { TypeOrmModule } from '@nestjs/typeorm';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Socket, Server } from 'socket.io';
import { AppService } from 'src/app.service';
import { Chat } from 'src/chat/chat.entity';


 @WebSocketGateway({cors: {origin: '*',}})
 export class AppGateway
 implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, TypeOrmModule
{
 constructor(private appService:AppService) {}
 
 @WebSocketServer() server: Server;
 
 @SubscribeMessage('sendMessage')// envoie de message a notre client
 async handleSendMessage(client: Socket, payload: Chat): Promise<void> {
   await this.appService.createMessage(payload);
   this.server.emit('recMessage', payload);
 }
 
 afterInit(server: Server) {
   console.log(server);
   //Do stuffs
 }
 
 handleDisconnect(client: Socket) {
   console.log(`Disconnected: ${client.id}`);
   //Do stuffs
 }
 
 handleConnection(client: Socket, ...args: any[]) {
   console.log(`Connected ${client.id}`);
   //Do stuffs
 }
}
