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

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll() {
    return {
      albums: await this.favsService.getAlbums(),
      artists: await this.favsService.getArtists(),
      tracks: await this.favsService.getTracks(),
    };
  }

  @Post('track/:id')
  async createTrack(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favsService.createTrack(id);
    } catch (e) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.removeTrack(id);
  }

  @Post('album/:id')
  async createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favsService.createAlbum(id);
    } catch (e) {
      throw new HttpException(
        'Album not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Post('artist/:id')
  async createArtist(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favsService.createArtist(id);
    } catch (e) {
      throw new HttpException(
        'Artist not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.removeArtist(id);
  }
}
