import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import 'dotenv/config';

console.log(process.env.POSTGRES_HOST);

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: 5432,
        username: configService.get('POSTGRES_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class AppModule {}
