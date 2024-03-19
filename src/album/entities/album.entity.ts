import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ type: 'uuid', nullable: true })
  // SET NULL - для того, чтобы при удалении артиста, в этой таблице чтобы значение выставлялось null
  @OneToOne(() => Artist, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  // стало валидировать на существование благодаря @JoinColumn
  artistId: string | null; // refers to Artist
}
