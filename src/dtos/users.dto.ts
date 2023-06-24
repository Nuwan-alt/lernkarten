import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
enum UserRole {
  User = "user",
  Admin = "admin"
}
export class CreateUserDto {

  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  public password: string;

  @IsString()
  @IsNotEmpty()

  public role: UserRole;;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  public password: string;
}
