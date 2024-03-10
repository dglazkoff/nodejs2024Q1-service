import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuid } from 'uuid';
import { Album } from '../interfaces/album';
import db from '../db/db';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const id = uuid();

    const album: Album = {
      id,
      ...createAlbumDto,
    };

    db.album.set(id, album);

    return this.findOne(id);
  }

  findAll() {
    return [...db.album.values()];
  }

  findAllByIds(ids: string[]) {
    return ids.map((id) => this.findOne(id)).filter(Boolean);
  }

  findOne(id: string) {
    return db.album.get(id);
  }

  update(album: Album, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum = {
      ...updateAlbumDto,
      id: album.id,
    };

    db.album.set(album.id, updatedAlbum);

    return updatedAlbum;
  }

  remove(album: Album) {
    if (db.album.delete(album.id)) {
      db.favs.albums.delete(album.id);
    }
  }

  removeArtist(artistId: string) {
    for (const album of db.album.values()) {
      if (album.artistId === artistId) {
        db.album.set(album.id, { ...album, artistId: null });
      }
    }
  }
}
