import { IsNumber,  IsNotEmpty, IsBoolean} from 'class-validator';

export class CreateFavDto {

  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @IsNumber()
  @IsNotEmpty()
  public card_id: number;

  @IsBoolean()
  @IsNotEmpty()
  public isFavourite: boolean;
}
