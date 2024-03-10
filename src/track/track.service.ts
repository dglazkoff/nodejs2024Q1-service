import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuid } from 'uuid';
import { User } from '../interfaces/user';
import userDB from '../db/user';
import { Track } from '../interfaces/track';
import trackDB from '../db/track';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const id = uuid();

    // проверять что есть такой артист и альбом ?
    const track: Track = {
      id,
      ...createTrackDto,
    };

    trackDB.set(id, track);

    return this.findOne(id);
  }

  findAll() {
    return [...trackDB.values()];
  }

  findAllByIds(ids: string[]) {
    return ids.map((id) => this.findOne(id)).filter(Boolean);
  }

  findOne(id: string) {
    return trackDB.get(id);
  }

  update(track: Track, updateTrackDto: UpdateTrackDto) {
    const updatedTrack = {
      ...updateTrackDto,
      id: track.id,
    };

    trackDB.set(track.id, updatedTrack);

    return updatedTrack;
  }

  remove(track: Track) {
    return trackDB.delete(track.id);
  }

  removeArtist(artistId: string) {
    for (const track of trackDB.values()) {
      if (track.artistId === artistId) {
        trackDB.set(track.id, { ...track, artistId: null });
      }
    }
  }

  removeAlbum(albumId: string) {
    for (const track of trackDB.values()) {
      if (track.albumId === albumId) {
        trackDB.set(track.id, { ...track, albumId: null });
      }
    }
  }
}
