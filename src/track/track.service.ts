import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    // // trackRepository will throw error if no artist or album with such id
    const track = this.trackRepository.create(createTrackDto);

    return this.trackRepository.save(track);
  }

  async findAll() {
    return this.trackRepository.find();
  }

  async findOne(id: string) {
    return this.trackRepository.findOneBy({ id });
  }

  async update(track: Track, updateTrackDto: UpdateTrackDto) {
    this.trackRepository.merge(track, updateTrackDto);

    return this.trackRepository.save(track);
  }

  async remove(track: Track) {
    return this.trackRepository.delete(track.id);
  }
}
