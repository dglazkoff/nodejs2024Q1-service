import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepository.create(createAlbumDto);

    // albumRepository will throw error if no artist with such id
    return this.albumRepository.save(album);
  }

  async findAll() {
    return this.albumRepository.find();
  }

  async findOne(id: string) {
    return this.albumRepository.findOneBy({ id });
  }

  update(album: Album, updateAlbumDto: UpdateAlbumDto) {
    this.albumRepository.merge(album, updateAlbumDto);

    return this.albumRepository.save(album);
  }

  remove(album: Album) {
    return this.albumRepository.delete(album.id);
  }
}
