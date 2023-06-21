import { IsString,  IsNotEmpty} from 'class-validator';

export class CreateSubTopicDto {

  @IsString()
  @IsNotEmpty()
  public title: string;
}
