document.addEventListener('DOMContentLoaded', init, false);

/** 
* You can manipulate the video here
* For example: Uncomment the code below and in the index to get a Start/Stop button
*/
function init() {
  const VP = document.getElementById('videoPlayer');
  VP.addEventListener('click', function() {
    if (VP.paused) VP.play()
    else VP.pause()
  })
}