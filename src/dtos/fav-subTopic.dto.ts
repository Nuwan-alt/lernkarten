import { IsString,  IsNotEmpty, IsNumber, IsBoolean} from 'class-validator';

export class CreateUser_SubtopicDto {

  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @IsNumber()
  @IsNotEmpty()
  public subtopic_id: number;

//   @IsBoolean()
//   public isFavourite: boolean;

}
