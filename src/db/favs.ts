import { Favs } from '../interfaces/favs';

const favsDB: Favs = {
  albums: new Set(),
  tracks: new Set(),
  artists: new Set(),
};

export default favsDB;
