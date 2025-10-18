import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText'
import { createScene } from './scene.js';
import { createLights } from './lights.js';
import { createParticles } from './particles.js';
import { setupCamera } from './camera.js';
import { loadTextures } from './textures.js';
import { createShaderPlane } from './shaderswindows.js';
import { createShaderTunnel } from './shadersTunnel.js';
import { createShaderPoteaux } from './shadersPoteau.js';
import { createSmokePlane  } from './smokeBox.js';
import { createShaderIndoor } from './shaderIndoor.js';
import { initCrowd, updateCrowd } from './crowd.js';

import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/Addons.js';


gsap.registerPlugin(SplitText);

/**
 * Animation Text
 */
document.addEventListener('DOMContentLoaded', () => {
    document.fonts.ready.then(() => {
        let split = SplitText.create(".text", {
            type: "chars"
        });

        gsap.from(split.chars, {
            y: 100,
            autoAlpha: 0,
            stagger: 0.1,
            opacity: 1
        });
    });
});

/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

/**
 * Textures et objets
 */
const textures = loadTextures();
const { floor, house } = createScene(scene, textures);

/**
 * Lumières
 */
const lights = createLights(scene, house);

/**
 * Fog
 */
scene.fog = new THREE.Fog('#000000', 10, 25);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 3, 8);
scene.add(camera);

/**
 * Controls - Désactivation de la rotation libre
 */
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableRotate = false;  
controls.enablePan = false;      
controls.enableZoom = false;     

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;


const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const rgbShiftPass = new ShaderPass(RGBShiftShader)
composer.addPass(rgbShiftPass)


// Shadows
floor.receiveShadow = true;

/**
 * Particules
 */
const particleSystem = createParticles(scene);

/**
 * Setup Camera Animation
 */
const { updateCamera } = setupCamera(camera, scene, controls, renderer);

/**
 * Shaders
 */
const { material } = createShaderPlane(scene);
const { shaderMaterial } = createShaderTunnel(scene);
const { postsGroup } = createShaderPoteaux(scene);
const { smokeMaterial } = createSmokePlane(scene);
const { materialIndoor } = createShaderIndoor(scene);
initCrowd(scene);

/**
 * Resize
 */
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    composer.setSize(sizes.width, sizes.height);
});

/**
 * Animation
 */
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    lights.animateLights(elapsedTime);

    particleSystem.animateParticles(elapsedTime);

    // Shaders Animation
    material.uniforms.uTime.value += 0.01; 
    materialIndoor.uniforms.uTime.value += 0.01; 
    shaderMaterial.uniforms.uTime.value += 0.01;
    smokeMaterial.uniforms.time.value += 0.015;

    postsGroup.children.forEach(post => {
        if (post.material && post.material.uniforms && post.material.uniforms.uTime) {
            post.material.uniforms.uTime.value += 0.01;
        }
    });
    
    updateCrowd();

    updateCamera();

    if (controls.enabled) controls.update();

    // renderer.render(scene, camera);
    composer.render();
    window.requestAnimationFrame(tick);
};
tick();
