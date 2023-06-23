import { IsString,  IsNotEmpty, IsNumber, IsDate} from 'class-validator';

export class CreateNext_ExamDto {

  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @IsDate()
  @IsNotEmpty()
  public exam_id: number;

  @IsDate()
  @IsNotEmpty()
  public exam_date: Date;
}
