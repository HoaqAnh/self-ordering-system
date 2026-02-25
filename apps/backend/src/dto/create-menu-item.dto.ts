import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
} from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên món ăn không được để trống' })
  name: string;

  @IsNumber()
  @Min(0, { message: 'Giá tiền không thể là số âm' })
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
