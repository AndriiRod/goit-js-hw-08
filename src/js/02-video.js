import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef = document.getElementById('vimeo-player');
const player = new Player(iframeRef);
const STORAGE_KEY = 'videoplayer-current-time';

getLocalStorageValue();
player.on('timeupdate', throttle(getTimeOfTimeline, 1000));

function getTimeOfTimeline(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}

function getLocalStorageValue() {
  const currentValue = localStorage.getItem(STORAGE_KEY);

  player.setCurrentTime(currentValue ? parseFloat(currentValue) : 0);
}

// function getLocalStorageValue() {
//   const currentValue = localStorage.getItem(STORAGE_KEY);

//   if (currentValue) player.setCurrentTime(parseFloat(currentValue));
// }
