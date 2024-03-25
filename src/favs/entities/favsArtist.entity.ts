import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class FavsArtist {
  @PrimaryGeneratedColumn()
  id: number;

  // CASCADE - для того, чтобы при удалении артиста, удалялась и запись в этой таблице
  @OneToOne(() => Artist, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  artist: string;
}
