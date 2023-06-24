import { IsString,  IsNotEmpty} from 'class-validator';

export class CreateArticledDto {

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsString()
  @IsNotEmpty()
  public image: string;
  
  @IsString()
  @IsNotEmpty()
  public link: string;
}
