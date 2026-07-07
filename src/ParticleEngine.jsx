import { useEffect, useRef, useCallback } from "react";

class Particle {
  constructor(x, y, color, size) {
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.color = color;
    this.size = size || Math.random() * 3 + 1;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.life = 1;
    this.decay = 0.003 + Math.random() * 0.005;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = 0.5 + Math.random() * 1.5;
    this.amplitude = 20 + Math.random() * 60;
  }

  disperse(strength, direction) {
    const dx = direction === "down" ? 0 : direction === "up" ? 0 : (Math.random() - 0.5);
    const dy = direction === "down" ? -strength : direction === "up" ? strength : (Math.random() - 0.5);
    this.vx += dx * (2 + Math.random() * 4);
    this.vy += dy * (2 + Math.random() * 4);
    this.decay = 0.01 + Math.random() * 0.02;
  }

  attract(x, y, force) {
    const dx = x - this.x;
    const dy = y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    this.vx += (dx / dist) * force * 0.1;
    this.vy += (dy / dist) * force * 0.1;
  }

  update(width, height, mouseX, mouseY, mouseActive) {
    // Mouse repulsion
    if (mouseActive && mouseX && mouseY) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      if (dist < 150) {
        const force = (150 - dist) / 150 * 0.8;
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }
    }

    // Gentle return to origin
    const dx = this.originX - this.x;
    const dy = this.originY - this.y;
    this.vx += dx * 0.0005;
    this.vy += dy * 0.0005;

    // Damping
    this.vx *= 0.98;
    this.vy *= 0.98;

    // Floating
    this.vx += Math.sin(this.angle) * 0.003;
    this.vy += Math.cos(this.angle * 1.3) * 0.003;
    this.angle += 0.01;

    // Update position
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;

    // Wrap edges
    if (this.x < -20) this.x = width + 20;
    if (this.x > width + 20) this.x = -20;
    if (this.y < -20) this.y = height + 20;
    if (this.y > height + 20) this.y = -20;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    const alpha = this.life * 0.7;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
    ctx.fillStyle = this.color.replace("1)", `${alpha})`).replace("rgb", "rgba");
    ctx.fill();
  }
}

export default function ParticleEngine({ pageIndex, direction, mouseRef }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animRef = useRef(null);
  const mousePosRef = useRef({ x: null, y: null, active: false });
  const widthRef = useRef(0);
  const heightRef = useRef(0);

  const COLORS = [
    "rgb(74, 140, 90)",    // forest green
    "rgb(120, 170, 100)",  // light green
    "rgb(200, 170, 110)",  // gold/amber
    "rgb(60, 100, 70)",    // dark green
    "rgb(180, 200, 160)",  // pale green
    "rgb(220, 190, 130)",  // warm gold
    "rgb(40, 60, 40)",     // deep forest
    "rgb(160, 190, 140)",  // sage
  ];

  const spawnParticles = useCallback((count, w, h) => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const p = new Particle(x, y, color);
      p.originX = x;
      p.originY = y;
      newParticles.push(p);
    }
    return newParticles;
  }, []);

  const handleMouseMove = useCallback((e) => {
    mousePosRef.current = {
      x: e.clientX,
      y: e.clientY,
      active: true,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mousePosRef.current.active = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      widthRef.current = window.innerWidth;
      heightRef.current = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Initial particles
    if (particlesRef.current.length === 0) {
      particlesRef.current = spawnParticles(120, widthRef.current, heightRef.current);
    }

    let lastPage = pageIndex;

    const animate = () => {
      const w = widthRef.current;
      const h = heightRef.current;
      const { x: mx, y: my, active } = mousePosRef.current;

      ctx.clearRect(0, 0, w, h);

      // Page changed - disperse particles
      if (lastPage !== pageIndex) {
        const dir = directionRef.current || "down";
        particlesRef.current.forEach((p) => p.disperse(3, dir));

        // Spawn new particles for the new page
        const newBatch = spawnParticles(40, w, h);
        particlesRef.current = [...particlesRef.current, ...newBatch];

        lastPage = pageIndex;
      }

      // Remove dead particles, keep total manageable
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0.05);
      if (particlesRef.current.length < 80) {
        const more = spawnParticles(20, w, h);
        particlesRef.current = [...particlesRef.current, ...more];
      }
      if (particlesRef.current.length > 300) {
        particlesRef.current = particlesRef.current.slice(-250);
      }

      particlesRef.current.forEach((p) => {
        p.update(w, h, mx, my, active);
        p.draw(ctx);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [pageIndex, spawnParticles, handleMouseMove, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

// Module-level ref to communicate direction between renders
const directionRef = { current: "down" };
export { directionRef };
