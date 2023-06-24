import { IsNumber,  IsNotEmpty, IsPositive} from 'class-validator';

export class CreateStageDto {

  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @IsNumber()
  @IsNotEmpty()
  public card_id: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  public stage: number;
}
