function Particle(x, y, colors, ctx, ww, wh, mouse, radius) {
  this.ctx = ctx;
  this.ww = ww;
  this.wh = wh;
  this.mouse = mouse;
  this.radius = radius;
  this.x = Math.random() * this.ww;
  this.y = Math.random() * this.wh;
  this.dest = { x: x, y: y };
  this.r = Math.random() * 2 * Math.PI;
  this.vx = (Math.random() - 0.5) * 25;
  this.vy = (Math.random() - 0.5) * 25;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random() * 0.025 + 0.94;
  this.color = colors[Math.floor(Math.random() * 2.75)];
}

Particle.prototype.render = function() {
  this.accX = (this.dest.x - this.x) / 1000;
  this.accY = (this.dest.y - this.y) / 1000;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;
  this.x += this.vx;
  this.y += this.vy;
  this.ctx.fillStyle = this.color;
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  this.ctx.fill();

  let a = this.x - this.mouse.x;
  let b = this.y - this.mouse.y;
  let distance = Math.sqrt(a * a + b * b);
  if (distance < this.radius * 75) {
    this.accX = (this.x - this.mouse.x) / 100;
    this.accY = (this.y - this.mouse.y) / 100;
    this.vx += this.accX;
    this.vy += this.accY;
  }
};

export default Particle;
