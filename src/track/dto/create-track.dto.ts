import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsUUID(4)
  artistId: string | null;

  @IsOptional()
  @IsString()
  @IsUUID(4)
  albumId: string | null;

  @IsNumber()
  duration: number;
}
