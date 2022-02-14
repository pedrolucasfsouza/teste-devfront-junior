interface Document {
  adoptedStyleSheets: any;
}

/********************************************************
 * Album
 ********************************************************/
// musica
interface TrackData {
  title: string;
  url: string;
}

// disco (para ser consumido)
interface AlbumData {
  artist: string;
  cover: string;
  title: string;
  tracks: TrackData[];
}

// Tipo que permite manipular o album
interface AlbumType {
  readonly artist: string;
  readonly cover: string;
  readonly title: string;
  readonly tracks: TrackData[];

  getUrlFromIndex(index: number): string | null;
  isFirstTrack(index: number): boolean;
  isLastTrack(index: number): boolean;
}

interface AlbumCtor {
  new (data: AlbumData): AlbumType;
}

/********************************************************
 * Playlist
 ********************************************************/

// coleção de discos
interface PlaylistType {
  readonly albums: AlbumType[];

  addAlbum(data: AlbumData);
  isFirstAlbum(index: number): boolean;
  isLastAlbum(index: number): boolean;
}

/********************************************************
 * Player
 ********************************************************/
// junkiebox
interface PlayerType {
  readonly album: AlbumType | null;
  readonly playing: boolean;
  readonly playlist: PlaylistType;
  readonly trackUrl: string | null;

  albumIndex: number;
  trackIndex: number;

  play(): void;
  pause(): void;
  nextTrack(): void;
  prevTrack(): void;
}
