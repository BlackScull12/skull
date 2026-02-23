const canvas = document.getElementById("skullCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let skulls = [];

for (let i = 0; i < 25; i++) {
  skulls.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 30 + Math.random() * 40,
    speed: 0.2 + Math.random()
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  skulls.forEach(s => {
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
    s.y += s.speed;
    if (s.y > canvas.height) s.y = -50;
  });
  requestAnimationFrame(animate);
}

animate();
