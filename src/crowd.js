import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Variables globales
let crowd;
let characterModel;
let scene;
let clock = new THREE.Clock(); // Horloge pour l'animation
let crowdParams = {
  size: 1000,
  position: { x: 1.6, y: 0.1, z: -18 },
  scale: { x: 0.5, y: 0.5, z: 0.5 },
  spread: 50,
  regenerate: () => regenerateCrowd(),
};

// Fonction pour animer la foule
export function updateCrowd() {
  if (!crowd) return;
  const elapsedTime = clock.getElapsedTime();
  const dummy = new THREE.Object3D();
  for (let i = 0; i < crowdParams.size; i++) {
    crowd.getMatrixAt(i, dummy.matrix);
    dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
    // Animation de sautillement
    dummy.position.y = crowdParams.position.y + 0.5 + Math.sin(elapsedTime * 4 + i) * 0.1;
    dummy.updateMatrix();
    crowd.setMatrixAt(i, dummy.matrix);
  }
  crowd.instanceMatrix.needsUpdate = true;
}

// Fonction d'initialisation
export function initCrowd(externalScene) {
  scene = externalScene;
  loadCharacterModel();
}

// Charger le modèle GLTF (sans animations)
function loadCharacterModel() {
  const loader = new GLTFLoader();
  loader.load(
    './models/bonhomme.glb',
    (gltf) => {
      characterModel = gltf.scene.children[0];
      createCrowd();
    },
    undefined,
    (error) => console.error('Erreur de chargement du modèle :', error)
  );
}

function createBlackMaterial() {
  return new THREE.MeshBasicMaterial({
    color: 0x000000,
  });
}

function createCrowd() {
  if (crowd) scene.remove(crowd);
  const modelClone = characterModel.clone();
  const crowdGeometry = modelClone.geometry;
  const blackMaterial = createBlackMaterial();
  crowd = new THREE.InstancedMesh(crowdGeometry, blackMaterial, crowdParams.size);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < crowdParams.size; i++) {
    dummy.position.set(
      (Math.random() - 0.5) * crowdParams.spread + crowdParams.position.x,
      crowdParams.position.y,
      (Math.random() - 0.5) * crowdParams.spread + crowdParams.position.z
    );
    dummy.rotation.y = Math.random() * Math.PI * 2;
    dummy.scale.set(crowdParams.scale.x, crowdParams.scale.y, crowdParams.scale.z);
    dummy.updateMatrix();
    crowd.setMatrixAt(i, dummy.matrix);
  }
  crowd.scale.set(crowdParams.scale.x, crowdParams.scale.y, crowdParams.scale.z);
  crowd.position.set(crowdParams.position.x, crowdParams.position.y, crowdParams.position.z);
  scene.add(crowd);
}

function regenerateCrowd() {
  createCrowd();
}
