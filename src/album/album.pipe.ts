import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Album } from '../interfaces/album';
import { AlbumService } from './album.service';

@Injectable()
export class AlbumPipe implements PipeTransform<string, Album> {
  constructor(private readonly albumService: AlbumService) {}

  transform(id: Album['id']) {
    const album = this.albumService.findOne(id);

    if (!album) {
      throw new NotFoundException(`No album with id ${id}`);
    }

    return album;
  }
}
