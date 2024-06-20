let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.slideshow-container');
  const slides = document.querySelectorAll('.slide');
  const nextButton = document.getElementById('next');

  const updateSlide = (index) => {
    slides[index].scrollIntoView({ behavior: 'smooth' });
  };

  const setCurrentIndex = () => {
    const scrollPosition = container.scrollTop;
    slides.forEach((slide, index) => {
      if (slide.offsetTop <= scrollPosition + 50 && slide.offsetTop + slide.offsetHeight > scrollPosition + 50) {
        currentIndex = index;
      }
    });
  };

  container.addEventListener('scroll', () => {
    setCurrentIndex();
  });

  let startY;
  container.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  });

  container.addEventListener('touchend', (e) => {
    const endY = e.changedTouches[0].clientY;
    if (startY > endY + 50 && currentIndex < slides.length - 1) {
      nextButton.click();
    }
  });
});

let player;
const videoSlideIndex = 3;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-slide', {
    height: '100%',
    width: '100%',
    videoId: 'ZQ0AgnYC0Ak',
    playerVars: {
      autoplay: 1,
      controls: 1,
      disablekb: 1,
      enablejsapi: 1,
      iv_load_policy: 3,
      loop: 0,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      fs: 0,
      playsinline: 1,
      mute: 1, // Mute the video to ensure autoplay compliance
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  handleScroll();
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.BUFFERING || event.data === YT.PlayerState.PAUSED) {
    player.playVideo();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  let currentIndex = 0;

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    slides.forEach((slide, index) => {
      const slideTop = slide.offsetTop;
      const slideBottom = slideTop + slide.offsetHeight;

      if (slideTop <= scrollPosition && scrollPosition <= slideBottom) {
        currentIndex = index;
        if (currentIndex === videoSlideIndex) {
          if (!player) {
            if (!window.YT) {
              const tag = document.createElement('script');
              tag.src = 'https://www.youtube.com/iframe_api';
              const firstScriptTag = document.getElementsByTagName('script')[0];
              firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            } else {
              onYouTubeIframeAPIReady();
            }
          } else {
            player.playVideo();
          }
        } else {
          if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
            player.pauseVideo();
          }
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  handleScroll();
});
