import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Professional } from "./professional.entity";
import { ProfessionalsController } from "./professionals.controller";
import { ProfessionalsService } from "./professionals.service";

@Module({
  imports: [TypeOrmModule.forFeature([Professional])],
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService],
})
export class ProfessionalsModule {}
