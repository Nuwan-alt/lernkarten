import { IsNumber,  IsNotEmpty} from 'class-validator';

export class GetCardDto {

  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @IsNumber()
  @IsNotEmpty()
  public card_id: number;
}
