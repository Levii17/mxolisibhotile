import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector('#three-canvas');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1, 5);

const renderer = new THREE.WebGLRenderer({ 
  canvas, 
  alpha: true, 
  antialias: true,
  powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
hemiLight.position.set(0, 10, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(3, 10, 10);
dirLight.castShadow = true;
scene.add(dirLight);

let model;

const loadingManager = new THREE.LoadingManager(
  () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  },
  (url, itemsLoaded, itemsTotal) => {
    const progress = (itemsLoaded / itemsTotal) * 100;
    console.log(`Loading progress: ${progress.toFixed(0)}%`);
  },
  (url) => {
    console.error(`Error loading resource: ${url}`);
  }
);

function loadModel() {
  const loader = new GLTFLoader(loadingManager);
  loader.load('model/mxolisi.glb', (gltf) => {
    model = gltf.scene;

    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.metalness = 0.2;
          child.material.roughness = 0.8;
        }
      }
    });

    scene.add(model);
    resizeModel();
    animate();
  }, undefined, (error) => {
    console.error('Error loading GLTF model:', error);
  });
}

// Lazy load model when canvas is visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadModel();
      observer.disconnect();
    }
  });
}, { threshold: 0.1 });
observer.observe(canvas);

function resizeModel() {
  if (!model) return;
  const width = window.innerWidth;
  const dpr = window.devicePixelRatio > 1 ? Math.min(1.5, window.devicePixelRatio) : 1;
  renderer.setPixelRatio(dpr);

  if (width < 600) {
    model.scale.set(0.8, 0.8, 0.8);
    camera.position.set(0, 1.2, 4);
    camera.fov = 55;
  } else if (width < 1024) {
    model.scale.set(1.2, 1.2, 1.2);
    camera.position.set(0, 1, 4.5);
    camera.fov = 50;
  } else {
    model.scale.set(1.5, 1.5, 1.5);
    camera.position.set(0, 1, 5);
    camera.fov = 45;
  }
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.y += 0.002;
    model.rotation.x = Math.sin(Date.now() * 0.001) * 0.01;
  }
  renderer.render(scene, camera);
}

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    resizeModel();
  }, 200);
});

document.addEventListener('mousemove', (e) => {
  if (!model) return;
  const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

  model.rotation.y = THREE.MathUtils.lerp(model.rotation.y, mouseX * 0.2, 0.05);
  model.rotation.x = THREE.MathUtils.lerp(model.rotation.x, -mouseY * 0.1, 0.05);
});

document.addEventListener('touchmove', (e) => {
  e.preventDefault();
  if (!model || !e.touches[0]) return;
  const touchX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
  const touchY = (e.touches[0].clientY / window.innerHeight) * 2 - 1;

  model.rotation.y = touchX * 0.3;
  model.rotation.x = -touchY * 0.2;
}, { passive: false });

window.addEventListener('beforeunload', () => {
  if (model) {
    model.traverse(child => {
      if (child.isMesh) {
        child.geometry.dispose();
        if (child.material) {
          Object.keys(child.material).forEach(prop => {
            if (child.material[prop] && child.material[prop].dispose) {
              child.material[prop].dispose();
            }
          });
        }
      }
    });
  }
  renderer.dispose();
});