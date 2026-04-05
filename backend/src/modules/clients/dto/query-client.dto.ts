import { IsOptional, IsString } from "class-validator";

export class QueryClientDto {
  @IsOptional()
  @IsString()
  search?: string;
}
