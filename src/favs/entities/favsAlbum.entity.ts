import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../album/entities/album.entity';

@Entity()
export class FavsAlbum {
  @PrimaryGeneratedColumn()
  id: number;

  // CASCADE - для того, чтобы при удалении артиста, удалялась и запись в этой таблице
  @OneToOne(() => Album, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  album: string;
}
