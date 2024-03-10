import { Injectable } from '@nestjs/common';

@Injectable()
export class FavsService {
  findAll() {
    return `This action returns all favs`;
  }

  createTrack(id: string) {
    return 'This action adds a new fav';
  }

  removeTrack(id: number) {
    return `This action removes a #${id} fav`;
  }

  createAlbum(id: string) {
    return 'This action adds a new fav';
  }

  removeAlbum(id: number) {
    return `This action removes a #${id} fav`;
  }

  createArtist(id: string) {
    return 'This action adds a new fav';
  }

  removeArtist(id: number) {
    return `This action removes a #${id} fav`;
  }
}
