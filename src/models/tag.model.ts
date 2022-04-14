import { IsNotEmpty, IsString, IsBoolean } from "class-validator";
import ITag from "./interfaces/tag.interface";

/**
 * A tag schema
 */
export class Tag implements ITag {
  @IsNotEmpty()
  @IsBoolean()
  public is_custom?: boolean;

  @IsNotEmpty()
  @IsString()
  public name?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(obj?: any) {
    if (obj && typeof obj === "object") {
      this.is_custom = obj.is_custom;
      this.name = obj.name;
    }
  }
}
