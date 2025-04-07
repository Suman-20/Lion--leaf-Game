score = 0;
cross = true;

audio = new Audio('game.mp3');
audiogo = new Audio('gameOver.mp3');




document.onkeydown = function (event) {
    if (audio.paused) {
        audio.play();
      }
 
  console.log("key code is: ", event.keyCode);
  if (event.keyCode == 38) {
    lion = document.querySelector(".lion");
    lion.classList.add("animatelion");
    setTimeout(() => {
      lion.classList.remove("animatelion");
    }, 1000);
  }
  if (event.keyCode == 39) {
    lion = document.querySelector(".lion");
    lionX = parseInt(
      window.getComputedStyle(lion, null).getPropertyValue("left")
    );
    lion.style.left = lionX + 112 + "px";
  }

  if (event.keyCode == 37) {
    lion = document.querySelector(".lion");
    lionX = parseInt(
      window.getComputedStyle(lion, null).getPropertyValue("left")
    );
    lion.style.left = lionX - 112 + "px";
  }
};

setInterval(() => {
  lion = document.querySelector(".lion");
  gameOver = document.querySelector(".gameOver");
  obstacle = document.querySelector(".obstacle");

  lx = parseInt(window.getComputedStyle(lion, null).getPropertyValue("left"));
  ly = parseInt(window.getComputedStyle(lion, null).getPropertyValue("top"));

  ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  offsetX = Math.abs(lx - ox);
  offsetY = Math.abs(ly - oy);

  console.log(offsetX, offsetY);

  if (offsetX < 73 && offsetY < 52) {
    gameOver.innerHTML = "Game Over - reload to Play again";
    obstacle.classList.remove("obstacleAni");
    audiogo.play();
    setTimeout(() => {
        audiogo.pause();
        audio.pause();
    }, 1000);
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);

    setTimeout(() => {
      aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      newDur = aniDur - 0.1;
      obstacle.style.animationDuration = newDur + "s";
      console.log('new animation duration : ', newDur)
    }, 500);
  }
}, 10);

function updateScore(score) {
  scoreCont.innerHTML = "your score: " + score;
}
