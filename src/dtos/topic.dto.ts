import { IsString,  IsNotEmpty} from 'class-validator';

export class CreateTopicDto {

  @IsString()
  @IsNotEmpty()
  public title: string;
}
