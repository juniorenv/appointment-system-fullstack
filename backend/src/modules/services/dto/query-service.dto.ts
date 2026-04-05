import { Transform } from "class-transformer";
import { IsOptional, IsBoolean, IsString, Length } from "class-validator";

export class QueryServiceDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }: { value: unknown }) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  })
  ativo?: boolean;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  categoria?: string;
}
