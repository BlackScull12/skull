const c = document.getElementById("skullCanvas");
const x = c.getContext("2d");
c.width = innerWidth;
c.height = innerHeight;

let skulls = [...Array(25)].map(() => ({
  x: Math.random() * c.width,
  y: Math.random() * c.height,
  s: 20 + Math.random() * 40
}));

function loop() {
  x.clearRect(0,0,c.width,c.height);
  skulls.forEach(k => {
    x.fillStyle = "rgba(255,255,255,0.06)";
    x.beginPath();
    x.arc(k.x,k.y,k.s,0,Math.PI*2);
    x.fill();
    k.y += 0.3;
    if (k.y > c.height) k.y = -50;
  });
  requestAnimationFrame(loop);
}

loop();
