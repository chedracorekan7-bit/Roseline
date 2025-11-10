<script setup>
import { onMounted, onUnmounted } from "vue";
import * as THREE from "three";

let scene, camera, renderer, stars;
let mouseX = 0,
  mouseY = 0;
let parallaxX = 0,
  parallaxY = 0;
let animationId;
let clock;

onMounted(() => {
  const canvas = document.getElementById("starfield");
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 1;
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Génération des étoiles
  const geometry = new THREE.BufferGeometry();
  const starCount = 1500;
  const positions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2000;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
  stars = new THREE.Points(geometry, material);
  scene.add(stars);

  // Parallax : suivi souris
  const onMouseMove = (event) => {
    mouseX = 2 * (event.clientX / window.innerWidth - 0.5);
    mouseY = 2 * (event.clientY / window.innerHeight - 0.5);
  };
  document.addEventListener("mousemove", onMouseMove);

  // Parallax : touch mobile (horizontal + vertical)
  const onTouchMove = (event) => {
    if (!event.touches || event.touches.length !== 1) return;
    mouseX = 2 * (event.touches[0].clientX / window.innerWidth - 0.5);
    mouseY = 2 * (event.touches[0].clientY / window.innerHeight - 0.5);
  };
  document.addEventListener("touchmove", onTouchMove);

  clock = new THREE.Clock();
  let baseRotY = 0;
  let baseRotX = 0;

  // Animation
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    const dt = clock.getDelta();

    // Rotation continue (ralentie)
    baseRotY += 0.08 * dt;
    baseRotX += 0.025 * dt;

    // Parallax offset : max 0.24 rad (env 14°)
    parallaxX += (mouseY * 0.24 - parallaxX) * 0.17;
    parallaxY += (mouseX * 0.24 - parallaxY) * 0.17;

    // Affecter la rotation continue ± parallax
    stars.rotation.x = baseRotX + parallaxX;
    stars.rotation.y = baseRotY + parallaxY;

    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  onUnmounted(() => {
    cancelAnimationFrame(animationId);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("touchmove", onTouchMove);
    renderer.dispose();
  });
});
</script>

<template>
  <canvas id="starfield" class="fixed inset-0 z-0 pointer-events-none"></canvas>
</template>

<style scoped>
canvas {
  position: fixed;
  inset: 0;
  background: transparent;
}
</style>
