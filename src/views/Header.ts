import { html, mounted } from '~/utils';
import './Header.css';
import { Player } from '~/models/Player';
import albums from '~/mocks/albums.json';

export function Header() {
  mounted(function () {
    function playPauseMusic() {
      const containerPlayer = document
        .getElementsByClassName('container-player')[0]
        .getElementsByClassName('img-play-pause')[0];

      if (!player.playing) {
        player.play();
        music!.play();
        containerPlayer.setAttribute('src', '/img/pause.svg');
        setInterval(progressBar, 1000);
      } else {
        player.pause();
        music!.pause();
        containerPlayer.setAttribute('src', '/img/play.svg');
      }

      console.log(player.playing);
    }

    function playPauseMusicNextPrev() {
      const containerPlayer = document
        .getElementsByClassName('container-player')[0]
        .getElementsByClassName('img-play-pause')[0];
      player.play();
      music!.play();
      containerPlayer.setAttribute('src', '/img/pause.svg');
      setInterval(progressBar, 1000);
    }

    function proximaMusica() {
      player.nextTrack();

      music?.setAttribute(
        'src',
        `${albums[player._albumIndex].tracks[player._trackIndex].url}`
      );
      playPauseMusicNextPrev();
      reRender();
      progressBar();
    }

    function voltarMusica() {
      player.prevTrack();
      music?.setAttribute(
        'src',
        `${albums[player._albumIndex].tracks[player._trackIndex].url}`
      );
      playPauseMusicNextPrev();
      reRender();
      progressBar();
    }

    function progressBar() {
      let progress = document.querySelector('progress');
      progress?.setAttribute(`value`, `${music?.currentTime}`);
      progress?.setAttribute(`max`, `${music?.duration}`);

      console.log(music?.currentTime);
    }

    function reRender() {
      for (let i = 0; albums.length > i; i++) {
        const containerItem = document.getElementsByClassName(
          'container-album-musics'
        )[i];
        // limpa as musicas
        containerItem.innerHTML = '';

        // re renderiza os itens
        for (let j = 0; albums[i].tracks.length > j; j++) {
          let divMusic = document.createElement('div');
          containerItem.appendChild(divMusic);

          // muda a classe do CSS apenas caso seja a trackindex atual
          if (i === player._albumIndex && j === player._trackIndex) {
            divMusic.innerHTML = `<div class="content-album-item-playing">${albums[i].tracks[j].title}</div>`;
          } else {
            divMusic.innerHTML = `<div class="content-album-item">${albums[i].tracks[j].title}</div>`;
          }
        }
      }
    }

    // tirando junkiebox da caixa (instanciando a classe)
    const player = new Player();
    const music = document.querySelector('audio');

    // configurando o junkiebox para sempre começar pela primeira música
    const musicStart = albums[0].tracks[0].url;
    music?.setAttribute(`src`, `${musicStart}`);

    // adicionando os albums (cds) que eu tenho no acervo, na "fila" do junkiebox
    const containerAlbums = document.querySelector('.containeralbums');
    for (let i = 0; albums.length > i; i++) {
      player.playlist.addAlbum(albums[i]);
      let divalbum = document.createElement('div');
      containerAlbums?.appendChild(divalbum);
      divalbum.innerHTML = `<div class="container-album"> <div class="content-album"> <img src="${player.playlist.albums[i].cover}" alt="artist" /> <div class="text-top-album"> <h1>${player.playlist.albums[i].title}</h1>  <h2>${player.playlist.albums[i].artist}</h2></div></div><div class="container-album-musics"></div></div>`;
    }

    // adicionando as tracks (musicas) aos devidos albums
    for (let i = 0; albums.length > i; i++) {
      const containerItem = document.getElementsByClassName(
        'container-album-musics'
      )[i];
      playPauseMusic();
      for (let j = 0; albums[i].tracks.length > j; j++) {
        let divMusic = document.createElement('div');
        containerItem.appendChild(divMusic);
        // como default,
        if (j === 0 && i === 0) {
          containerItem.innerHTML = `<div class="content-album-item-playing">${albums[i].tracks[j].title}</div>`;
        }
        divMusic.innerHTML = `<div class="content-album-item">${albums[i].tracks[j].title}</div>`;
      }
    }

    // Atribuindo as funções aos botões do player
    document
      .querySelector('.img-play-pause')!
      .addEventListener('click', playPauseMusic);

    document
      .querySelector('.img-prev')!
      .addEventListener('click', voltarMusica);

    document
      .querySelector('.img-next')!
      .addEventListener('click', proximaMusica);
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
