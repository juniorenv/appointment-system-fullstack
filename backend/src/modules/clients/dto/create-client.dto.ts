import { Transform, Type } from "class-transformer";
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
  MaxLength,
} from "class-validator";

export class CreateClientDto {
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
  @Matches(/^\d{11}$/, {
    message: "cpf deve conter exatamente 11 dígitos numéricos",
  })
  cpf?: string | null;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  data_nascimento?: string | null;

  // -- endereço --

  @IsOptional()
  @IsString()
  @Matches(/^\d{8}$/, {
    message: "cep deve conter exatamente 8 dígitos numéricos",
  })
  cep?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  logradouro?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  numero?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  complemento?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  bairro?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  cidade?: string | null;

  @IsOptional()
  @IsString()
  @Matches(/^[A-Z]{2}$/, {
    message: "estado deve ser uma UF com 2 letras maiúsculas",
  })
  estado?: string | null;

  // -- extra --

  @IsOptional()
  @IsString()
  @MaxLength(500)
  observacoes?: string | null;
}
