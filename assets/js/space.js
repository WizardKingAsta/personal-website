// space.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("space-canvas"), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

// Add lighting
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0xaaaaaa, 0.5));

// Create a helper function to make planets
function createPlanet(textureUrl, x, y, z) {
  const texture = new THREE.TextureLoader().load(textureUrl);
  const geometry = new THREE.SphereGeometry(3, 32, 32);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const planet = new THREE.Mesh(geometry, material);
  planet.position.set(x, y, z);
  scene.add(planet);
  return planet;
}

// Example planets (replace with your actual textures)
const planets = [
  createPlanet('planet_adj_0_0.png', -20, 10, -50),
  createPlanet('planet_adj_0_1.png', 10, -5, -60),
  createPlanet('planet_adj_0_2.png', 30, 15, -70),
];

// Make them clickable with raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets);
  if (intersects.length > 0) {
    const clickedPlanet = intersects[0].object;
    const index = planets.indexOf(clickedPlanet);
    // Trigger your tab logic here
    window.location.hash = `#planet${index + 1}`;
  }
});

function animate() {
  requestAnimationFrame(animate);
  planets.forEach(p => p.rotation.y += 0.002); // rotate planets
  renderer.render(scene, camera);
}
animate();
