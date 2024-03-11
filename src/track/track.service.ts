import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuid } from 'uuid';
import { Track } from '../interfaces/track';
import db from '../db/db';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const id = uuid();

    // FIXME: remove after adding typeorm
    if (createTrackDto.albumId && !db.album.has(createTrackDto.albumId)) {
      throw new HttpException('Album not found', HttpStatus.BAD_REQUEST);
    }

    // FIXME: remove after adding typeorm
    if (createTrackDto.artistId && !db.artist.has(createTrackDto.artistId)) {
      throw new HttpException('Artist not found', HttpStatus.BAD_REQUEST);
    }

    const track: Track = {
      id,
      ...createTrackDto,
    };

    db.track.set(id, track);

    return this.findOne(id);
  }

  findAll() {
    return [...db.track.values()];
  }

  findAllByIds(ids: string[]) {
    return ids.map((id) => this.findOne(id)).filter(Boolean);
  }

  findOne(id: string) {
    return db.track.get(id);
  }

  update(track: Track, updateTrackDto: UpdateTrackDto) {
    const updatedTrack = {
      ...updateTrackDto,
      id: track.id,
    };

    db.track.set(track.id, updatedTrack);

    return updatedTrack;
  }

  remove(track: Track) {
    if (db.track.delete(track.id)) {
      db.favs.tracks.delete(track.id);
    }
  }

  removeArtist(artistId: string) {
    for (const track of db.track.values()) {
      if (track.artistId === artistId) {
        db.track.set(track.id, { ...track, artistId: null });
      }
    }
  }

  removeAlbum(albumId: string) {
    for (const track of db.track.values()) {
      if (track.albumId === albumId) {
        db.track.set(track.id, { ...track, albumId: null });
      }
    }
  }
}
