import { Injectable } from '@nestjs/common';
import favsDB from '../db/favs';

@Injectable()
export class FavsService {
  getAlbums() {
    return [...favsDB.albums];
  }

  getTracks() {
    return [...favsDB.tracks];
  }

  getArtists() {
    return [...favsDB.artists];
  }

  createTrack(id: string) {
    favsDB.tracks.add(id);
  }

  removeTrack(id: string) {
    return favsDB.tracks.delete(id);
  }

  createAlbum(id: string) {
    favsDB.albums.add(id);
  }

  removeAlbum(id: string) {
    return favsDB.albums.delete(id);
  }

  createArtist(id: string) {
    favsDB.artists.add(id);
  }

  removeArtist(id: string) {
    return favsDB.artists.delete(id);
  }
}
