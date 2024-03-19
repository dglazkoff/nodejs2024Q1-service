import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../../track/entities/track.entity';

@Entity()
export class FavsTrack {
  @PrimaryGeneratedColumn()
  id: number;

  // CASCADE - для того, чтобы при удалении артиста, удалялась и запись в этой таблице
  @OneToOne(() => Track, {
    onDelete: 'CASCADE',
    // If set to true, the relation will always be loaded with the main entity when using find* methods or QueryBuilder on this entity
    // возвращаем вместе с сущностью track всегда при поиске
    eager: true,
    // так как не может существовать сущности FavsTrack если нет трека
    nullable: false,
  })
  @JoinColumn()
  track: string;
}
