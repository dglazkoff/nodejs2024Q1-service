import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavsAlbum } from './entities/favsAlbum.entity';
import { FavsArtist } from './entities/favsArtist.entity';
import { FavsTrack } from './entities/favsTrack.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavsAlbum)
    private favsAlbumsRepository: Repository<FavsAlbum>,

    @InjectRepository(FavsArtist)
    private favsArtistRepository: Repository<FavsArtist>,

    @InjectRepository(FavsTrack)
    private favsTrackRepository: Repository<FavsTrack>,
  ) {}
  async getAlbums() {
    return this.favsAlbumsRepository
      .find()
      .then((favsAlbums) => favsAlbums.flatMap((favsAlbum) => favsAlbum.album));
  }

  async getTracks() {
    return this.favsTrackRepository
      .find()
      .then((favsTracks) => favsTracks.flatMap((favsTrack) => favsTrack.track));
  }

  async getArtists() {
    return this.favsArtistRepository
      .find()
      .then((favsArtists) =>
        favsArtists.flatMap((favsArtist) => favsArtist.artist),
      );
  }

  async createTrack(id: string) {
    const favsTrack = this.favsTrackRepository.create({ track: id });

    return this.favsTrackRepository.save(favsTrack);
  }

  async removeTrack(id: string) {
    return this.favsTrackRepository.delete({ track: id });
  }

  async createAlbum(id: string) {
    const favsAlbum = this.favsAlbumsRepository.create({ album: id });

    return this.favsAlbumsRepository.save(favsAlbum);
  }

  async removeAlbum(id: string) {
    return this.favsAlbumsRepository.delete({ album: id });
  }

  async createArtist(id: string) {
    const favsArtist = this.favsArtistRepository.create({ artist: id });

    return this.favsArtistRepository.save(favsArtist);
  }

  removeArtist(id: string) {
    return this.favsArtistRepository.delete({ artist: id });
  }
}
