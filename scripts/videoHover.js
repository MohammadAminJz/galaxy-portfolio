const video1 = document.querySelector('#projectVideo1');
const video2 = document.querySelector('#projectVideo2');
const video3 = document.querySelector('#projectVideo3');
const hoverSign = document.querySelector('.hover-sign');


const videoList = [video1, video2, video3];
videoList.forEach((video) => {
    video.addEventListener('mouseover', () => {
        video.play();
        hoverSign.classList.add('active');
    })
    video.addEventListener('mouseout', () => {
        video.pause();
        hoverSign.classList.remove('active');
    })
})