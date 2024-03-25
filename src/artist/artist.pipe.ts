import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistPipe implements PipeTransform<string, Promise<Artist>> {
  constructor(private readonly artistService: ArtistService) {}

  async transform(id: Artist['id']) {
    const artist = await this.artistService.findOne(id);

    if (!artist) {
      throw new NotFoundException(`No artist with id ${id}`);
    }

    return artist;
  }
}
