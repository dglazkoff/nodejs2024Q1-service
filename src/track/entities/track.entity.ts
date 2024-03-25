import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => Artist, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null; // refers to Artist

  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => Album, {
    onDelete: 'SET NULL',
  })
  // для тестирования миграции можно убрать это поле и выполнить команду migrations:generate
  @JoinColumn({ name: 'albumId' })
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number
}
