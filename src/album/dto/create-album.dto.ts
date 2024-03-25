import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  // Checks if given value is not empty (!== '', !== null, !== undefined).
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsString()
  @IsOptional()
  // проверить что это не просто строка, но и формата uuid
  @IsUUID(4)
  artistId: string | null;
}
