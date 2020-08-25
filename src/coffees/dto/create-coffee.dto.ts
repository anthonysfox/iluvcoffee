import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// Using readonly to maintain immutability
export class CreateCoffeeDto {
  @ApiProperty({ description: 'The name of the coffee' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of coffee' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
