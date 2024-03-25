import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumPipe implements PipeTransform<string, Promise<Album>> {
  constructor(private readonly albumService: AlbumService) {}

  async transform(id: Album['id']) {
    const album = await this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException(`No album with id ${id}`);
    }

    return album;
  }
}
