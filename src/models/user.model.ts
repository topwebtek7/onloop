import { IsAlphanumeric, IsNotEmpty, IsEmail, IsString } from "class-validator";
import IUser from "./interfaces/user.interface";

/**
 * An user schema
 */
export class User implements IUser {
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  public name?: string;

  @IsNotEmpty()
  @IsEmail()
  public email?: string;

  @IsString()
  @IsNotEmpty()
  public phone_number?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(obj?: any) {
    if (obj && typeof obj === "object") {
      this.name = obj.name;
      this.email = obj.email;
      this.phone_number = obj.phone_number;
    }
  }
}
