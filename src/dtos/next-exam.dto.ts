import { IsString,  IsNotEmpty, IsNumber, IsDate} from 'class-validator';

export class CreateNext_ExamDto {

  @IsNumber()
  @IsNotEmpty()
  public user_id: number;

  @IsNumber()
  @IsNotEmpty()
  public exam_id: number;

  @IsString()
  @IsNotEmpty()
  public exam_date: string;
}
