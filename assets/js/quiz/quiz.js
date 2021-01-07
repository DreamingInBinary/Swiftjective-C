function throwConfetti() {
  maxParticleCount = Math.random() * 100 + 150;
  startConfetti();
  setInterval(function() {
    stopConfetti();
  }, 1200);
}

window.addEventListener("load", function(){
  throwConfetti();
})

