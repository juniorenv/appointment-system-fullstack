import { IsOptional, IsString } from "class-validator";

export class FindClientsDto {
  @IsOptional()
  @IsString()
  search?: string;
}
