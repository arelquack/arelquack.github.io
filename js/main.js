// Basic Three.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("threejs-bg").appendChild(renderer.domElement);

// Bintang-Bintang di Background
const starsGeometry = new THREE.BufferGeometry();
const starCount = 1000;
const positions = [];

for (let i = 0; i < starCount; i++) {
    positions.push((Math.random() - 0.5) * 2000); // X
    positions.push((Math.random() - 0.5) * 2000); // Y
    positions.push((Math.random() - 0.5) * 2000); // Z
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// Mouse Interactivity
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Torus Geometry
const torusGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, wireframe: true });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Torus Rotation
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;

    // Star Field
    starField.rotation.y += 0.001;

    renderer.render(scene, camera);
}
animate();

// Custom Cursor
const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Responsive Resize
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// GSAP
gsap.registerPlugin(ScrollTrigger);

gsap.from("#skills", {
    scrollTrigger: "#skills",
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
});

// Toggle Hamburger
const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
});