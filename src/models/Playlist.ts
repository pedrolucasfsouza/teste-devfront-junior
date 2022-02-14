import { Album } from './Album';
export class Playlist implements PlaylistType {
  readonly albums: AlbumType[];

  constructor() {
    this.albums = [];
  }

  addAlbum(data: AlbumData) {
    this.albums.push(new Album(data));
  }
  isFirstAlbum(index: number): boolean {
    return index === 0;
  }

  isLastAlbum(index: number): boolean {
    const lengthalbums = this.albums.length;
    return lengthalbums - 1 === index;
  }
}
