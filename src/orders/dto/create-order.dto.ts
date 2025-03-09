import { ArrayMinSize, IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { OrderDetailDto } from "./order-detail.dto";
import { Type } from "class-transformer";

export class CreateOrderDto {

    @IsString({ message: "El userId debe ser un texto" })
    userId: string;

    @IsString({ message: "El clientName debe ser un texto" })
    clientName: string;

    @IsString({ message: "El clientLastName debe ser un texto" })
    clientLastName: string;

    @IsNumber({ maxDecimalPlaces: 2 }, { message: "El total debe ser un numero" })
    total: number;

    @IsArray()
    @ArrayMinSize(1, { message: "Debe agregar minimo un producto"})
    @ValidateNested({ each: true })
    @Type(() => OrderDetailDto)
    orderDetails: OrderDetailDto[]
}
