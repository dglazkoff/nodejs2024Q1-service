import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsAlbum } from './entities/favsAlbum.entity';
import { FavsArtist } from './entities/favsArtist.entity';
import { FavsTrack } from './entities/favsTrack.entity';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [TypeOrmModule.forFeature([FavsAlbum, FavsArtist, FavsTrack])],
})
export class FavsModule {}
