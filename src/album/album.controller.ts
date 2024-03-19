import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumPipe } from './album.pipe';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe, AlbumPipe) album: Album) {
    return album;
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseUUIDPipe, AlbumPipe) album: Album,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(album, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe, AlbumPipe) album: Album) {
    return this.albumService.remove(album);
  }
}
