import { IsString,  IsNotEmpty} from 'class-validator';

export class CreateExamDto {

  @IsString()
  @IsNotEmpty()
  public title: string;
}
