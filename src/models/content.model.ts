import { Timestamp } from "@google-cloud/firestore";
import { IsNotEmpty, IsString, IsArray, ValidateNested } from "class-validator";
import IContent from "./interfaces/content.interface";
import { Tag } from "./";

/**
 * A content schema
 */
export class Content implements IContent {
  @IsString()
  public description?: string;

  @IsString()
  public image?: string;

  @IsString()
  @IsNotEmpty()
  public status?: string;

  @IsString()
  public title?: string;

  @IsString()
  public url?: string;

  @IsNotEmpty()
  public created_at?: Timestamp;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(obj?: any) {
    if (obj && typeof obj === "object") {
      this.description = obj.description;
      this.image = obj.image;
      this.status = obj.status;
      this.title = obj.title;
      this.url = obj.url;
      this.created_at = obj.created_at;
    }
  }
}

export class PreviewRequest {
  @IsNotEmpty()
  @IsString()
  public url?: string;

  @IsNotEmpty()
  @IsString()
  public user_id = '';

  @IsArray()
  @ValidateNested()
  public tags?: Tag[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(obj?: any) {
    if (obj && typeof obj === "object") {
      this.url = obj.url;
      this.user_id = obj.user_id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.tags = (obj.tags || []).map((tag: any) => new Tag(tag));
    }
  }
}
