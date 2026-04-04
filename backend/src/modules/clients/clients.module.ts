import { Module } from "@nestjs/common";
import { ClientsController } from "./clients.controller";
import { ClientsService } from "./clients.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "./client.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
