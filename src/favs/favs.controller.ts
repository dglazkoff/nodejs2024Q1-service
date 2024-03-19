import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  findAll() {
    return {
      albums: this.albumService.findAllByIds(this.favsService.getAlbums()),
      tracks: this.trackService.findAllByIds(this.favsService.getTracks()),
      artists: this.artistService.findAllByIds(this.favsService.getArtists()),
    };
  }

  @Post('track/:id')
  createTrack(@Param('id', ParseUUIDPipe) id: string) {
    if (this.trackService.findOne(id)) {
      return this.favsService.createTrack(id);
    }

    throw new HttpException('Track not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    const isRemoved = this.favsService.removeTrack(id);

    if (!isRemoved) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('album/:id')
  createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    if (this.albumService.findOne(id)) {
      return this.favsService.createAlbum(id);
    }

    throw new HttpException('Album not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const isRemoved = this.favsService.removeAlbum(id);

    if (!isRemoved) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('artist/:id')
  createArtist(@Param('id', ParseUUIDPipe) id: string) {
    if (this.artistService.findOne(id)) {
      return this.favsService.createArtist(id);
    }

    throw new HttpException(
      'Artist not found',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    const isRemoved = this.favsService.removeArtist(id);

    if (!isRemoved) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
