// src/utils/html.ts
var html = String.raw;

// src/utils/mounted.ts
var mounted = function(callback) {
  setTimeout(callback, 10);
};

// src/models/Album.ts
var Album = class {
  constructor(album) {
    this.artist = album.artist;
    this.cover = album.cover;
    this.title = album.title;
    this.tracks = album.tracks;
  }
  getUrlFromIndex(index) {
    var _a;
    return ((_a = this.tracks[index]) == null ? void 0 : _a.url) || null;
  }
  isFirstTrack(index) {
    return index === 0;
  }
  isLastTrack(index) {
    const lengthtracks = this.tracks.length;
    return lengthtracks - 1 === index;
  }
};

// src/models/Playlist.ts
var Playlist = class {
  constructor() {
    this.albums = [];
  }
  addAlbum(data) {
    this.albums.push(new Album(data));
  }
  isFirstAlbum(index) {
    return index === 0;
  }
  isLastAlbum(index) {
    const lengthalbums = this.albums.length;
    return lengthalbums - 1 === index;
  }
};

// src/models/Player.ts
var Player = class {
  constructor() {
    this.album = null;
    this.playing = false;
    this.playlist = new Playlist();
    this.trackUrl = null;
    this._albumIndex = 0;
    this._trackIndex = 0;
  }
  set albumIndex(_albumIndex) {
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
  get albumIndex() {
    return this._albumIndex;
  }
  set trackIndex(_trackIndex) {
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
  get trackIndex() {
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
};

// src/mocks/albums.json
var albums_default = [
  {
    title: "Symphony Collection",
    artist: "Ludwig van Beethoven",
    cover: "/img/beethoven.png",
    tracks: [
      {
        title: "Moolight Sonata",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/beethoven_moonlight_sonata.mp3"
      },
      {
        title: "F\xFCr Elise",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/beethoven_fur_elise-para-elise.mp3"
      },
      {
        title: "Sinfonia No. 5",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/03-01-Symphony-No.-5-in-C-minor-Op.-67-1.-Allegro-Con-Brio.mp3"
      }
    ]
  },
  {
    title: "Preludes Collection",
    artist: "Fr\xE9d\xE9ric Chopin",
    cover: "/img/chopin.png",
    tracks: [
      {
        title: "Nocturne in E flat major Op. 9",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/1-Nocturne-in-E-flat-major-Op.-9-No.-2.mp3"
      },
      {
        title: "Minute Waltz",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/10-Minute-Waltz.mp3"
      },
      {
        title: "Grande valse brillante in E flat major",
        url: "https://www.netmundi.org/home/wp-content/uploads/2017/08/5-Grande-valse-brillante-in-E-flat-major.mp3"
      }
    ]
  }
];

// src/views/Header.ts
function Header() {
  mounted(function() {
    function playPauseMusic() {
      const containerPlayer = document.getElementsByClassName("container-player")[0].getElementsByClassName("img-play-pause")[0];
      if (!player.playing) {
        player.play();
        music.play();
        containerPlayer.setAttribute("src", "/img/pause.svg");
        setInterval(progressBar, 1e3);
      } else {
        player.pause();
        music.pause();
        containerPlayer.setAttribute("src", "/img/play.svg");
      }
      console.log(player.playing);
    }
    function playPauseMusicNextPrev() {
      const containerPlayer = document.getElementsByClassName("container-player")[0].getElementsByClassName("img-play-pause")[0];
      player.play();
      music.play();
      containerPlayer.setAttribute("src", "/img/pause.svg");
      setInterval(progressBar, 1e3);
    }
    function proximaMusica() {
      player.nextTrack();
      music == null ? void 0 : music.setAttribute("src", `${albums_default[player._albumIndex].tracks[player._trackIndex].url}`);
      playPauseMusicNextPrev();
      reRender();
      progressBar();
    }
    function voltarMusica() {
      player.prevTrack();
      music == null ? void 0 : music.setAttribute("src", `${albums_default[player._albumIndex].tracks[player._trackIndex].url}`);
      playPauseMusicNextPrev();
      reRender();
      progressBar();
    }
    function progressBar() {
      let progress = document.querySelector("progress");
      progress == null ? void 0 : progress.setAttribute(`value`, `${music == null ? void 0 : music.currentTime}`);
      progress == null ? void 0 : progress.setAttribute(`max`, `${music == null ? void 0 : music.duration}`);
      console.log(music == null ? void 0 : music.currentTime);
    }
    function reRender() {
      for (let i = 0; albums_default.length > i; i++) {
        const containerItem = document.getElementsByClassName("container-album-musics")[i];
        containerItem.innerHTML = "";
        for (let j = 0; albums_default[i].tracks.length > j; j++) {
          let divMusic = document.createElement("div");
          containerItem.appendChild(divMusic);
          if (i === player._albumIndex && j === player._trackIndex) {
            divMusic.innerHTML = `<div class="content-album-item-playing">${albums_default[i].tracks[j].title}</div>`;
          } else {
            divMusic.innerHTML = `<div class="content-album-item">${albums_default[i].tracks[j].title}</div>`;
          }
        }
      }
    }
    const player = new Player();
    const music = document.querySelector("audio");
    const musicStart = albums_default[0].tracks[0].url;
    music == null ? void 0 : music.setAttribute(`src`, `${musicStart}`);
    const containerAlbums = document.querySelector(".containeralbums");
    for (let i = 0; albums_default.length > i; i++) {
      player.playlist.addAlbum(albums_default[i]);
      let divalbum = document.createElement("div");
      containerAlbums == null ? void 0 : containerAlbums.appendChild(divalbum);
      divalbum.innerHTML = `<div class="container-album"> <div class="content-album"> <img src="${player.playlist.albums[i].cover}" alt="artist" /> <div class="text-top-album"> <h1>${player.playlist.albums[i].title}</h1>  <h2>${player.playlist.albums[i].artist}</h2></div></div><div class="container-album-musics"></div></div>`;
    }
    for (let i = 0; albums_default.length > i; i++) {
      const containerItem = document.getElementsByClassName("container-album-musics")[i];
      playPauseMusic();
      for (let j = 0; albums_default[i].tracks.length > j; j++) {
        let divMusic = document.createElement("div");
        containerItem.appendChild(divMusic);
        if (j === 0 && i === 0) {
          containerItem.innerHTML = `<div class="content-album-item-playing">${albums_default[i].tracks[j].title}</div>`;
        }
        divMusic.innerHTML = `<div class="content-album-item">${albums_default[i].tracks[j].title}</div>`;
      }
    }
    document.querySelector(".img-play-pause").addEventListener("click", playPauseMusic);
    document.querySelector(".img-prev").addEventListener("click", voltarMusica);
    document.querySelector(".img-next").addEventListener("click", proximaMusica);
  });
  return html`
    <div class="containeralbums"></div>

    <div class="container-player">
      <img class="img-prev" src="/img/prev.svg" alt="prev" />
      <img class="img-play-pause" src="/img/play.svg" alt="play" />
      <img class="img-next" src="/img/next.svg" alt="next" />
    </div>

    <audio src=""></audio>
    <div class="duracao">
      <div class="barra">
        <progress value="0" max="1000"></progress>
      </div>
    </div>
  `;
}

// src/views/App.ts
function App() {
  return html` <div class="App">${Header()}</div> `;
}

// src/index.ts
var root = document.querySelector("#root");
root.innerHTML = App();
