import { IsNumber,  IsNotEmpty, IsString} from 'class-validator';

export class CreateNotesDto {

  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @IsNumber()
  @IsNotEmpty()
  public card_id: number;

  @IsString()
  @IsNotEmpty()
  public notes: string;
}
