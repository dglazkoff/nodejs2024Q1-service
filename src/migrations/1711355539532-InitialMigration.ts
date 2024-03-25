import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1711355539532 implements MigrationInterface {
  name = 'InitialMigration1711355539532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL, CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer NOT NULL, "artistId" uuid, CONSTRAINT "REL_3d06f25148a4a880b429e3bc83" UNIQUE ("artistId"), CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "REL_997cfd9e91fd00a363500f72dc" UNIQUE ("artistId"), CONSTRAINT "REL_b105d945c4c185395daca91606" UNIQUE ("albumId"), CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favs_track" ("id" SERIAL NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "REL_28c9de42b6ec6006dc8d348e4b" UNIQUE ("trackId"), CONSTRAINT "PK_011173d2315c901694d007df651" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favs_artist" ("id" SERIAL NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "REL_df306a9342211309aa318672ab" UNIQUE ("artistId"), CONSTRAINT "PK_49c97e0459459f059668d392674" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favs_album" ("id" SERIAL NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "REL_1bf06a30e5e9094752369d4e20" UNIQUE ("albumId"), CONSTRAINT "PK_c3334e674ca6208a2664b6cd479" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_track" ADD CONSTRAINT "FK_28c9de42b6ec6006dc8d348e4b2" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_artist" ADD CONSTRAINT "FK_df306a9342211309aa318672ab1" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_album" ADD CONSTRAINT "FK_1bf06a30e5e9094752369d4e206" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favs_album" DROP CONSTRAINT "FK_1bf06a30e5e9094752369d4e206"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_artist" DROP CONSTRAINT "FK_df306a9342211309aa318672ab1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favs_track" DROP CONSTRAINT "FK_28c9de42b6ec6006dc8d348e4b2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"`,
    );
    await queryRunner.query(`DROP TABLE "favs_album"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "favs_artist"`);
    await queryRunner.query(`DROP TABLE "favs_track"`);
    await queryRunner.query(`DROP TABLE "track"`);
    await queryRunner.query(`DROP TABLE "album"`);
    await queryRunner.query(`DROP TABLE "artist"`);
  }
}
