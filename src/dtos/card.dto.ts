import { IsString,  IsNotEmpty} from 'class-validator';

export class CreateCardDto {

  @IsString()
  @IsNotEmpty()
  public question: string;

  @IsString()
  @IsNotEmpty()
  public answer: string;
}
