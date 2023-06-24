import { IsString,  IsNotEmpty, IsNumber} from 'class-validator';

export class CreateCustomCardDto {

  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @IsString()
  @IsNotEmpty()
  public question: string;

  @IsString()
  @IsNotEmpty()
  public answer: string;
}
