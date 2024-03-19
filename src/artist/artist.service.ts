import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}
  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create(createArtistDto);

    return this.artistRepository.save(artist);
  }

  async findAll() {
    return this.artistRepository.find();
  }

  async findOne(id: string) {
    return this.artistRepository.findOneBy({ id });
  }

  async update(artist: Artist, updateArtistDto: UpdateArtistDto) {
    this.artistRepository.merge(artist, updateArtistDto);

    return this.artistRepository.save(artist);
  }

  remove(artist: Artist) {
    return this.artistRepository.delete(artist.id);
  }
}
