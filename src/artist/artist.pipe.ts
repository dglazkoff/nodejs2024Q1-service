import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Artist } from '../interfaces/artist';
import { ArtistService } from './artist.service';

@Injectable()
export class ArtistPipe implements PipeTransform<string, Artist> {
  constructor(private readonly artistService: ArtistService) {}

  transform(id: Artist['id']) {
    const artist = this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException(`No artist with id ${id}`);
    }

    return artist;
  }
}
