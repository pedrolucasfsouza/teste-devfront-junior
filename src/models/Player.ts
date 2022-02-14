import { Playlist } from './Playlist';
export class Player implements PlayerType {
  album: AlbumType | null = null;
  playing: boolean = false;
  readonly playlist: PlaylistType = new Playlist();
  trackUrl: string | null = null;

  //podem ser modificadas
  _albumIndex: number = 0;
  _trackIndex: number = 0;

  set albumIndex(_albumIndex: number) {
    if (this.playlist === null) {
      this._albumIndex = 0;
    } else if (_albumIndex <= 0) {
      this._albumIndex = 0;
    } else if (_albumIndex >= this.playlist.albums.length) {
      this._albumIndex = 0;
    } else {
      this._albumIndex = _albumIndex;
    }
  }
  get albumIndex(): number {
    return this._albumIndex;
  }

  set trackIndex(_trackIndex: number) {
    if (this.album === null) {
      _trackIndex = 0;
    } else if (_trackIndex < 0) {
      _trackIndex = 0;
    } else if (_trackIndex > this.album.tracks.length) {
      this._trackIndex = 0;
    } else {
      this._trackIndex = _trackIndex;
    }
  }
  get trackIndex(): number {
    return this._trackIndex;
  }

  play() {
    this.album = this.playlist.albums[0];
    this.trackUrl = this.album.getUrlFromIndex(0);
    this.playing = true;
  }
  pause() {
    this.playing = false;
  }
  nextTrack() {
    if (this.album === null) {
      this._trackIndex = 0;
    } else if (this.album.isLastTrack(this._trackIndex)) {
      this._trackIndex = 0;
      this.albumIndex = this.albumIndex + 1;
    } else {
      this._trackIndex++;
    }
  }
  prevTrack() {
    if (this.album === null) {
      this._trackIndex = 0;
    } else if (this.album.isFirstTrack(this._trackIndex)) {
      if (this._albumIndex === 0) {
        const lastAlbumIndex = this.playlist.albums.length - 1;
        const lastAlbum = this.playlist.albums[lastAlbumIndex];
        const lastTrackIndex = lastAlbum.tracks.length - 1;
        this._trackIndex = lastTrackIndex;
        this._albumIndex = lastAlbumIndex;
      } else {
        const prevAlbum = this.playlist.albums[this._albumIndex - 1];
        const prevTrackIndex = prevAlbum.tracks.length - 1;
        this._trackIndex = prevTrackIndex;
        this._albumIndex--;
      }
    } else {
      this._trackIndex--;
    }
  }
}
