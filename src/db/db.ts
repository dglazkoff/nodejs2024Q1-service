import { Album } from '../interfaces/album';
import { User } from '../interfaces/user';
import { Artist } from '../interfaces/artist';
import { Track } from '../interfaces/track';
import { Favs } from '../interfaces/favs';

const db = {
  album: new Map<string, Album>(),
  artist: new Map<string, Artist>(),
  track: new Map<string, Track>(),
  user: new Map<string, User>(),
  favs: {
    albums: new Set(),
    tracks: new Set(),
    artists: new Set(),
  } as Favs,
};

export default db;
