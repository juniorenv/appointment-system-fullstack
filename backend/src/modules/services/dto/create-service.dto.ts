import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsNumber,
  IsBoolean,
  IsPositive,
  Min,
  Max,
  Length,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  nome!: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  descricao?: string;

  @Type(() => Number)
  @IsInt()
  @Min(5, { message: "duração mínima é 5 minutos" })
  @Max(480, { message: "duração máxima é 480 minutos (8 horas)" })
  duracao!: number;

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Valor deve ser numérico com até 2 casas decimais" },
  )
  @Max(99_999_999.99, { message: "Valor máximo permitido é R$ 99.999.999,99" })
  @IsPositive({ message: "preço deve ser maior que zero" })
  preco!: number;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  categoria?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean = true;
}
