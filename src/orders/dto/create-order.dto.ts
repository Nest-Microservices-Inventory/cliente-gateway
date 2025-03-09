import { IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
    @IsString({ message: "El userId debe ser un texto" })
    userId: string;

    @IsString({ message: "El clientName debe ser un texto" })
    clientName: string;

    @IsString({ message: "El clientLastName debe ser un texto" })
    clienteLastName: string;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: "El total debe ser un numero" })
    total: number;
}
