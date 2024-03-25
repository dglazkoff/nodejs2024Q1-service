import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackPipe implements PipeTransform<string, Promise<Track>> {
  constructor(private readonly trackService: TrackService) {}

  async transform(id: Track['id']) {
    const track = await this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException(`No track with id ${id}`);
    }

    return track;
  }
}
