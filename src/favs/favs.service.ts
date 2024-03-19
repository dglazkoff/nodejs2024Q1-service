import { Injectable } from '@nestjs/common';
import db from '../db/db';

@Injectable()
export class FavsService {
  getAlbums() {
    return [...db.favs.albums];
  }

  getTracks() {
    return [...db.favs.tracks];
  }

  getArtists() {
    return [...db.favs.artists];
  }

  createTrack(id: string) {
    db.favs.tracks.add(id);
  }

  removeTrack(id: string) {
    return db.favs.tracks.delete(id);
  }

  createAlbum(id: string) {
    db.favs.albums.add(id);
  }

  removeAlbum(id: string) {
    return db.favs.albums.delete(id);
  }

  createArtist(id: string) {
    db.favs.artists.add(id);
  }

  removeArtist(id: string) {
    return db.favs.artists.delete(id);
  }
}
