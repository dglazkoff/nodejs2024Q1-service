import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuid } from 'uuid';
import { Artist } from '../interfaces/artist';
import db from '../db/db';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const id = uuid();

    const artist: Artist = {
      id,
      ...createArtistDto,
    };

    db.artist.set(id, artist);

    return this.findOne(id);
  }

  findAll() {
    return [...db.artist.values()];
  }

  findAllByIds(ids: string[]) {
    return ids.map((id) => this.findOne(id)).filter(Boolean);
  }

  findOne(id: string) {
    return db.artist.get(id);
  }

  update(artist: Artist, updateArtistDto: UpdateArtistDto) {
    const updatedArtist = {
      ...updateArtistDto,
      id: artist.id,
    };

    db.artist.set(artist.id, updatedArtist);

    return updatedArtist;
  }

  remove(artist: Artist) {
    if (db.artist.delete(artist.id)) {
      db.favs.artists.delete(artist.id);
      return true;
    }

    return false;
  }
}
