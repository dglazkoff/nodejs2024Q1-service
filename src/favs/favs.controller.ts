import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { FavsService } from './favs.service';

// может я как то смогу внутри favs создать подтип для tracks и т.д.
// сделать модули
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  createTrack(@Param('id') id: string) {
    return this.favsService.createTrack(id);
  }

  @Delete('track/:id')
  removeTrack(@Param('id') id: string) {
    return this.favsService.removeTrack(+id);
  }

  @Post('album/:id')
  createAlbum(@Param('id') id: string) {
    return this.favsService.createAlbum(id);
  }

  @Delete('album/:id')
  removeAlbum(@Param('id') id: string) {
    return this.favsService.removeAlbum(+id);
  }

  @Post('artist/:id')
  createArtist(@Param('id') id: string) {
    return this.favsService.createArtist(id);
  }

  @Delete('artist/:id')
  removeArtist(@Param('id') id: string) {
    return this.favsService.removeArtist(+id);
  }
}
