import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuid } from 'uuid';
import { Artist } from '../interfaces/artist';
import artistDB from '../db/artist';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const id = uuid();

    const artist: Artist = {
      id,
      ...createArtistDto,
    };

    artistDB.set(id, artist);

    return this.findOne(id);
  }

  findAll() {
    return [...artistDB.values()];
  }

  findAllByIds(ids: string[]) {
    return ids.map((id) => this.findOne(id)).filter(Boolean);
  }

  findOne(id: string) {
    return artistDB.get(id);
  }

  update(artist: Artist, updateArtistDto: UpdateArtistDto) {
    const updatedArtist = {
      ...updateArtistDto,
      id: artist.id,
    };

    artistDB.set(artist.id, updatedArtist);

    return updatedArtist;
  }

  remove(artist: Artist) {
    return artistDB.delete(artist.id);
  }
}
