import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { Track } from '../interfaces/track';
import { TrackService } from './track.service';

@Injectable()
export class TrackPipe implements PipeTransform<string, Track> {
  constructor(private readonly trackService: TrackService) {}

  transform(id: Track['id']) {
    const track = this.trackService.findOne(id);

    if (!track) {
      throw new NotFoundException(`No track with id ${id}`);
    }

    return track;
  }
}
