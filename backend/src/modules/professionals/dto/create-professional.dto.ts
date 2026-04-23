import { Transform } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from "class-validator";
import { Service } from "src/modules/services/service.entity";

export class CreateProfessionalDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 120)
  nome!: string;

  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.toLowerCase().trim() : value,
  )
  @MaxLength(200)
  email!: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @Length(10, 20)
  telefone!: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  especialidade?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean = true;

  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true, message: "cada serviço deve ser um UUID válido" })
  servicos?: Service[];
}
