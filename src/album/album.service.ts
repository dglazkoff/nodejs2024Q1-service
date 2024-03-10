import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuid } from 'uuid';
import { Album } from '../interfaces/album';
import albumDB from '../db/album';
import trackDB from '../db/track';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const id = uuid();

    const album: Album = {
      id,
      ...createAlbumDto,
    };

    albumDB.set(id, album);

    return this.findOne(id);
  }

  findAll() {
    return [...albumDB.values()];
  }

  findAllByIds(ids: string[]) {
    return ids.map((id) => this.findOne(id)).filter(Boolean);
  }

  findOne(id: string) {
    return albumDB.get(id);
  }

  update(album: Album, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum = {
      ...updateAlbumDto,
      id: album.id,
    };

    albumDB.set(album.id, updatedAlbum);

    return updatedAlbum;
  }

  remove(album: Album) {
    return albumDB.delete(album.id);
  }

  removeArtist(artistId: string) {
    for (const album of albumDB.values()) {
      if (album.artistId === artistId) {
        albumDB.set(album.id, { ...album, artistId: null });
      }
    }
  }
}
