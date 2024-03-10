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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistPipe } from './artist.pipe';
import { Artist } from '../interfaces/artist';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';

@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
  ) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe, ArtistPipe) artist: Artist) {
    return artist;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseUUIDPipe, ArtistPipe) artist: Artist,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.update(artist, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe, ArtistPipe) artist: Artist) {
    if (this.artistService.remove(artist)) {
      this.trackService.removeArtist(artist.id);
      this.albumService.removeArtist(artist.id);
    }
  }
}
