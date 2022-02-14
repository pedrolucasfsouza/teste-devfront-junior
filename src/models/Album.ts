export class Album implements AlbumType {
  readonly artist: string;
  readonly cover: string;
  readonly title: string;
  readonly tracks: TrackData[];

  constructor(album: AlbumData) {
    this.artist = album.artist;
    this.cover = album.cover;
    this.title = album.title;
    this.tracks = album.tracks;
  }

  getUrlFromIndex(index: number): string | null {
    return this.tracks[index]?.url || null;
  }

  isFirstTrack(index: number): boolean {
    return index === 0;
  }

  isLastTrack(index: number): boolean {
    const lengthtracks = this.tracks.length;
    return lengthtracks - 1 === index;
  }
}
