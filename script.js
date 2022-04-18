
const image = document.querySelector('img');
const title = document.querySelector('#title')
const artist = document.querySelector('#artist')
const music = document.querySelector('audio');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const duration = document.querySelector('#duration');
const curTime = document.querySelector('#current-time');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

const musicList = [
    {name: 'jacinto-1',
     artist: 'jacinto',
     title: 'song-1'   
    },
    {name: 'jacinto-2',
     artist: 'jacinto',
     title: 'song-2'   
    },
    {name: 'jacinto-3',
     artist: 'jacinto',
     title: 'song-3'   
    },
    {name: 'metric-1',
     artist: 'jacinto/2',
     title: 'song-4'   
    },
];

let songIndex = 0;
let isPlay = false;
let durationMin = 0;
let durationSec = 0;
let currentMin = 0;
let currentSec = 0;

loadSong(0);
function loadSong(index) {
    music.setAttribute('src', `music/${musicList[index].name}.mp3`);
    image.setAttribute('src', `img/${musicList[index].name}.jpg`);
    title.textContent = musicList[index].title;
    artist.textContent = musicList[index].artist;
    // duration.textContent = `${durationMin}:${durationSec}`;
    curTime.textContent = '0:00';
}

function playMusic() {
    isPlay = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
    
}

function pauseMusic() {
    isPlay = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();

}
    
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = musicList.length -1;
    }
    loadSong(songIndex);
    if (isPlay) {
        playMusic();
    }
}

function nextSong() {
    songIndex++;
    if (songIndex > musicList.length -1) {
        songIndex = 0;
    }
    loadSong(songIndex);
    if (isPlay) {
        playMusic();
    }
}

function updateProgress(e) {
    if(isPlay) {
        let percent =  (e.srcElement.currentTime/e.srcElement.duration) * 100;
        progress.style.width = `${percent}%`;
        // durationMin = Math.floor(e.srcElement.duration/60);
        // durationSec = Math.floor(e.srcElement.duration % 60);
        // if (durationSec < 10) {
        //     durationSec = `0${durationSec}`;
        // }
        currentMin = Math.floor(e.srcElement.currentTime/60);
        currentSec = Math.floor(e.srcElement.currentTime%60);
        if (currentSec < 10) {
            currentSec = `0${currentSec}`;
        }
        else if (currentSec > 59) {
            currentSec = currentSec-60;
        }
        // if (durationSec) {
        //     duration.textContent = `${durationMin}:${durationSec}`;
        // }
        curTime.textContent = `${currentMin}:${currentSec}`;
    }
}

function changeProgress(e) {
    let setPercent = e.offsetX / this.clientWidth * 100;
    progress.style.width = `${setPercent}%`;
    const {duration} = music;
    music.currentTime = (e.offsetX / this.clientWidth) * duration;
}

function setDurationByMeta(e) {
    durationMin = Math.floor(e.path[0].duration / 60);
     durationSec = Math.floor(e.path[0].duration % 60);
     if (durationSec < 10) {
         durationSec = `0${durationSec}`;
     }
     duration.textContent = `${durationMin}:${durationSec}`;
    // console.log(e);
}

prevBtn.addEventListener('click', () => prevSong());
playBtn.addEventListener('click', () => (isPlay ? pauseMusic() : playMusic()));
nextBtn.addEventListener('click', () => nextSong());
music.addEventListener('timeupdate', updateProgress);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', changeProgress);
music.addEventListener('loadedmetadata', setDurationByMeta);
