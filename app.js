const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const player = new MusicPlayer(musicList);
const ul = document.querySelector("ul");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerHeight;
canvas.height = window.innerHeight;
let mouse = {
x: null,
y: null,
radius: (canvas.height / 80) * (canvas.width / 80),
};
window.addEventListener("mousemove", function (event) {
mouse.x = event.x;
mouse.y = event.y;
});
// class Particle {
// constructor(x, y, directionX, directionY, size, color) {
//   this.x = x;
//   this.y = y;
//   this.directionX = directionX;
//   this.directionY = directionY;
//   this.size = size;
//   this.color = color;
//   }
//   draw() {
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
//     ctx.fillStyle = "#8x5523";
//     ctx.fill();
//     }
//     update() {
//       if (this.x > canvas.width || this.x < 0) {
//         this.directionX = -this.directionX;
//       }
//       if (this.y > canvas.height || this.y < 0) {
//         this.directionY = -this.directionY;
//       }
//       let dx = mouse.x - this.x;
//       let dy = mouse.y - this.y;
//       let distance = Math.sqrt(dx * dx + dy * dy);
//       if (distance < mouse.radius + this.size) {
//         if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
//           this.x += 10;
//         }
//         if (mouse.x > this.x && this.y > this.size * 10) {
//           this.x -= 10;
//         }
//         if (mouse.y < this.y && this.y < canvas.width - this.size * 10) {
//           this.y += 10;
//         }
//         if (mouse.y > this.y && this.y > this.size * 10) {
//           this.y -= 10;
//         }
//       }
//       this.x += this.directionX;
//       this.y += this.directionY;
//       this.draw();
//     }
//   }
//   function init() {
//     particlesArray = [];
//     let numberOfParticles = (canvas.height * canvas.width) / 9000;
//     for (let i = 0; i < numberOfParticles; i++) {
//       let size = Math.random() * 5 + 1;
//       let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
//       let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
//       let directionX = Math.random() * 5 - 2.5;
//       let directionY = Math.random() * 5 - 2.5;
//       let color = "#8x5523";
//       particlesArray.push(
//         new Particle(x, y, directionX, directionY, size, color)
//       );
//     }
//   }
//   function animate() {
//     requestAnimationFrame(animate);
//     ctx.clearRect(0, 0, innerWidth, innerHeight);

//     for (let i = 0; i < particlesArray.length; i++) {
//       particlesArray[i].update();
//     }
//     connect();
//   }
//   function connect() {
//     for (let a = 0; a < particlesArray.length; a++) {
//       for (let b = a; b < particlesArray.length; b++) {
//         let distance =
//           (particlesArray[a].x - particlesArray[b].x) *
//             (particlesArray[a].x - particlesArray[b].x) +
//           (particlesArray[a].y - particlesArray[b].y) *
//             (particlesArray[a].y - particlesArray[b].y);
//         if (distance < (canvas.width / 7) * (canvas.height / 7)) {
//           ctx.strokeStyle = "rgba(140,85,31,1)";
//           ctx.lineWidth = 1;
//           ctx.beginPath();
//           ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
//           ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
//           ctx.stroke();
//         }
//       }
//     }
//   }
//   init();
//   animate();

  window.addEventListener("load", () => {
    displayMusicList(player.musicList);
    let music = player.getMusic();
    displayMusic(music);
  });

  function displayMusic(music) {
    title.innerHTML = music.getName();
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;

    var list = document.getElementsByClassName(
      "list-group-item d-flex justify-content-center align-items-center"
    );

    console.log(list, 11);
    for (let index = 0; index < list.length; index++) {
      if (index == player.index) {
        const element = list[index];
        element.classList.add("playing");
      }
    }
  }

  play.addEventListener("click", () => {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
  });

  prev.addEventListener("click", () => {
    prevMusic();
  });

  next.addEventListener("click", () => {
    nextMusic();
  });

  const prevMusic = () => {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}

const nextMusic = () => {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
    isPlayingNow();
}


  const pauseMusic = () => {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
    audio.pause();
  };
  const playMusic = () => {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
  };

  const calculateTime = (toplamSaniye) => {
    const dakika = Math.floor(toplamSaniye / 60);
    const saniye = Math.floor(toplamSaniye % 60);
    const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
    const sonuc = `${dakika}:${guncellenenSaniye}`;
    console.log(sonuc);
    return sonuc;
  };

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    currentTime.textContent = calculateTime(audio.currentTime);
    progressBar.max = Math.floor(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    console.log(audio.currentTime);
    currentTime.textContent = "";
    currentTime.textContent = calculateTime(audio.currentTime);
    //currentTime.textContent = calculateTime(progressBar.value);
  });

  progressBar.addEventListener("input", () => {
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
  });

  let sesDurumu = "sesli";

  volumeBar.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if (value == 0) {
      audio.muted = true;
      sesDurumu = "sessiz";
      volume.classList = "fa-solid fa-volume-xmark";
      volumeBar.value = 0;
    } else {
      audio.muted = false;
      sesDurumu = "sesli";
      volume.classList = "fa-solid fa-volume-high";
    }
  });

  volume.addEventListener("click", () => {
    if (sesDurumu === "sesli") {
      audio.muted = true;
      sesDurumu = "sessiz";
      volume.classList = "fa-solid fa-volume-xmark";
      volumeBar.value = 0;
    } else {
      audio.muted = false;
      sesDurumu = "sesli";
      volume.classList = "fa-solid fa-volume-high";
      volumeBar.value = 100;
    }
  });

  const displayMusicList = (list) => {
    for (let i = 0; i < list.length; i++) {
      let liTag = `
      <li li-index='${i}' onclick = "selectedMusic(this)" class="list-group-item d-flex justify-content-center align-items-center">
        <span>${list[i].getName()}</span>
        <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
        <audio class="music-$(i)" src="mp3/${list[i].file}></audio>
      </li>
      `;

      ul.insertAdjacentHTML("beforeend", liTag);

      let liAudioDuration = ul.querySelector(`#music-${i}`);
      let liAudioTag = ul.querySelector(`.music-${i}`);

      liAudioTag = ul.querySelector("loadeddata", () => {
        liAudioDuration.innerText = calculateTime(liAudioTag.duration);
      });
    }
  };

  const selectedMusic = (li) => {
    player.index = li.getAttribute("li-index");
    displayMusic(player.getMusic());

    playMusic();
    isPlayingNow();
  };

  const isPlayingNow = () => {
    for (let li of ul.querySelectorAll("li")) {
      if (li.classList.contains("playing")) {
        li.classList.remove("playing");
      }
      if (li.getAttribute("li-index") == player.index) {
        li.classList.add("playing");
        }

    }
  };
  audio.addEventListener("ended", () =>{
  })


  particlesJS("particles-js", {"particles":{"number":{"value":240,"density":{"enable":false,"value_area":7290.9656122808765}},"color":{"value":"#000000"},"shape":{"type":"circle","stroke":{"width":3,"color":"#000000"},"polygon":{"nb_sides":3},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"grab"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;