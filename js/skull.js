const c = document.getElementById("skullCanvas");
const x = c.getContext("2d");
c.width = innerWidth;
c.height = innerHeight;

const skulls = Array.from({ length: 25 }, () => ({
  x: Math.random() * c.width,
  y: Math.random() * c.height,
  r: 20 + Math.random() * 40
}));

function animate() {
  x.clearRect(0,0,c.width,c.height);
  skulls.forEach(s => {
    x.fillStyle = "rgba(255,255,255,0.06)";
    x.beginPath();
    x.arc(s.x,s.y,s.r,0,Math.PI*2);
    x.fill();
    s.y += 0.3;
    if (s.y > c.height) s.y = -50;
  });
  requestAnimationFrame(animate);
}

animate();
